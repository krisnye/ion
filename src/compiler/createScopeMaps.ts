import { traverse, skip, Lookup } from "@glas/traverse"
import { Node, Scope, Reference, Declarator, Pattern, Location, ObjectPattern, RestElement, ArrayPattern, FunctionExpression, Declaration, Module, Variable, Parameter, Property, Identifier, Expression } from "./ast"
import { isMetaName, SemanticError } from "./common"
import { getAbsolutePath } from "./pathFunctions"

export type NodeMap<T> = {
    get(node: Node | null): T
    set(node: Node, t: T)
}

export type ScopeMap = { [id: string]: Declarator }
export type ScopeMaps = NodeMap<ScopeMap>

type Options = {
    callback?: (current: Declarator, previous?: Declarator) => void,
    lookup?: Lookup,
    dependencies?: Map<string,any>,
    skipFunctionBodies?: Boolean,
    globalScope?: object,
}

function declareGlobals(module: Module, options: Options & { globalScope }, map: Map<any,any>) {
    if (module.body) {
        let last = module.body[module.body.length - 1] as Expression
        // for now we are linking Declarations and Expressions directly.
        // That's not right. We need our shared references to be consistent across pre-compiled modules.
        options.globalScope[getAbsolutePath(module.name)] = last
        createScopeMaps(module, options, map)
    }
}

/**
 * Creates a global scope by using the exports within each module.
 */
function createGlobalScope(modules: Iterable<Module>, map: Map<any,any>, options: Options) {
    let scope: any = {}
    if (modules) {
        for (let module of modules) {
            declareGlobals(
                module,
                {...options, skipFunctionBodies: true, dependencies: undefined, globalScope: scope },
                map
            )
        }
    }
    return scope
}

function declare(scopes: object[], node: Declarator, options: Options = {}) {
    let scope: any = scopes[scopes.length - 1]
    if (options.callback) {
        let previous = scope[node.name]
        options.callback(node, previous)
    }
    scope[node.name] = node
}

export function *getDeclarators(node: Pattern | Identifier | Expression): Iterable<Declarator> {
    if (Declarator.is(node)) {
        yield node
    }
    else if (RestElement.is(node)) {
        yield node.value
    }
    else if (ObjectPattern.is(node)) {
        for (let property of node.properties) {
            if (RestElement.is(property)) {
                yield *getDeclarators(property)
            }
            else if (Pattern.is(property.id)) {
                yield *getDeclarators(property.id)
            }
        }
    }
    else if (ArrayPattern.is(node)) {
        for (let element of node.elements) {
            if (element != null) {
                yield *getDeclarators(element)
            }
        }
    }
    else if (Pattern.is(node)) {
        throw SemanticError(`TODO: Handle this Pattern: ${node.constructor.name}`, node)
    }
    //  Identifiers and Expressions end up here, yielding nothing
    //  This is present because Property's are Declarations with possible non-Pattern id's.
}

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, options: Options = {}, map = new Map()): ScopeMaps {
    let globalScope = options.globalScope || (options.dependencies ? createGlobalScope(options.dependencies.values(), map, options) : {});
    map.set(null, globalScope);
    let scopes: object[] = [globalScope];

    traverse(root, {
        lookup: options.lookup,
        skip(node) {
            return Location.is(node)
        },
        enter(node, ancestors) {
            //  get the current scope
            let scope = scopes[scopes.length - 1]
            //  save a map from this nodes location to it's scope
            map.set(node, scope)
            function pushScope() {
                scopes.push(scope = { __proto__: scope, __source: node.constructor.name + " => " + JSON.stringify(node.location ?? "NULL") })
            }

            //  if this node is a scope then we push a new scope
            if (Scope.is(node)) {
                pushScope()
            }

            if (Declaration.is(node)) {
                for (let declarator of getDeclarators(node.id)) {
                    declare(scopes, declarator, options)
                }
            }
        },
        leave(node) {
            if (Scope.is(node)) {
                scopes.pop()
            }
        }
    })

    return map
}