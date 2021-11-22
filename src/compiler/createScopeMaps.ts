import { traverse, skip, Lookup } from "@glas/traverse"
import { Node, Scope, Reference, Declarator, Pattern, ObjectPattern, RestElement, ArrayPattern, FunctionExpression, Declaration, Module, Variable, Parameter } from "./ast"
import { SemanticError } from "./common"
import { getAbsolutePath } from "./pathFunctions"

export type NodeMap<T> = {
    get(node: Node): T
    set(node: Node, t: T)
}

export type ScopeMap = { [id: string]: Declaration }
export type ScopeMaps = NodeMap<ScopeMap>

type Options = {
    callback?: (current: Declarator, previous?: Declarator) => void,
    lookup?: Lookup,
    globalScope?: any
}

function declareGlobals(scope, module: Module) {
    for (let node of module.body) {
        if (Declaration.is(node)) {
            for (let declarator of getDeclarators(node.id)) {
                let globalPath = getAbsolutePath(module.name, declarator.name)
                scope[globalPath] = declarator
            }
        }
    }
}

/**
 * Creates a global scope by using the exports within each module.
 */
export function createGlobalScope(modules: Iterable<Module>) {
    let scope: any = {}
    for (let module of modules) {
        declareGlobals(scope, module)
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

export function *getDeclarators(node: Pattern): Iterable<Declarator> {
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
    else {
        throw SemanticError(`TODO: Handle this Pattern: ${node.constructor.name}`, node)
    }
}

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, options: Options = {}): ScopeMaps {
    let map = new Map()
    let scopes: object[] = [options.globalScope || {}]

    traverse(root, {
        lookup: options.lookup,
        enter(node, ancestors) {
            if (!Node.is(node)) {
                return
            }
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