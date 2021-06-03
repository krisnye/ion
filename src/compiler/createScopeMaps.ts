import { traverse, skip } from "@glas/traverse"
import { getAncestor, getAncestorsAndSelfList, SemanticError } from "./common"
import { Node, FunctionExpression, Scope, Identifier, Reference, Declaration, VariableDeclaration, Declarator, Pattern, Parameter, File, ClassDeclaration, ExpressionStatement, Expression, ImportDefaultSpecifier, ObjectPattern, RestElement, ArrayPattern, AssignmentPattern } from "./ast"
import * as types from "./types"
import { createIsType, IsType } from "./analysis/isType"
import isConsequent from "./analysis/isConsequent"

export type NodeMap<T> = {
    get(global: null): T
    get(node: Node): T
    set(node: Node, t: T)
}

export type ScopeMap = { [id: string]: Declarator }
export type ScopeMaps = NodeMap<ScopeMap>

export class ScopeContext {

    identifiers = new Set<String>()
    ancestors = new Map<Node,Node>()
    scopes: ScopeMaps
    isType: IsType = () => { throw new Error(`set isType in constructor`) }

    constructor(root, isType = false) {
        let _implements: Identifier[][] | undefined = isType ? [] : undefined
        this.scopes = createScopeMaps(root, {
            identifiers: this.identifiers,
            ancestorsMap: this.ancestors,
            implements: _implements,
        })
        if (_implements) {
            this.isType = createIsType(_implements)
        }
    }

    isConsequent(a: Expression, b: Expression) {
        return isConsequent(a, b, this.isType)
    }

    getParent(node: Node) {
        return this.ancestors.get(node)
    }

    getAncestor<T>(node: Node, predicate: (node: T) => node is T) {
        return getAncestor(node, this.ancestors, predicate)
    }

    /**
     * Returns an array of self and ancestors starting at [self, parent...]
     */
    getAncestorList(node: Node) {
        return getAncestorsAndSelfList(node, this.ancestors)
    }

    getDeclarator(node: Reference)
    getDeclarator(node: Node, name: string)
    getDeclarator(node: Node, name?: string) {
        if (name == null && Reference.is(node)) {
            let result = this.getScope(node)?.[node.name]
            if (result == null && node.path != null) {
                // check global scope
                let global = this.scopes.get(null)
                result = global[node.path]
            }
            return result
        }
        if (name == null) {
            throw new Error()
        }
        return this.getScope(node)?.[name]
    }

    getScope(node: Node) {
        return this.scopes.get(node)
    }

}

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * scopes.get(null) will return the global scope
 * @param root the ast
 */
export default function createScopeMaps(
    root,
    options: {
        identifiers?: Set<String>,
        ancestorsMap?: Map<Node, Node>,
        implements?: Identifier[][], // @see isType#baseTypes
        // pathMap?: Map<Node, Array<String>>,  // consider doing scalar storage, like ancestors above
    } = {}
): ScopeMaps {
    let {
        identifiers = new Set<String>(),
        ancestorsMap,
        // pathMap
    } = options

    let map = new Map()
    let global = {
        // // always add "." to the global namespace so TypeExpressions don't complain
        // ".": new VariableDeclaration({ id: new Identifier({ name: "." }), kind: "const" })
    }
    let scopes: object[] = [global]
    map.set(null, global)

    function declare(node: Identifier) {
        identifiers.add(node.name)
        let scope: any = scopes[scopes.length - 1]
        scope[node.name as any] = node
        if (node.path) {
            // if path, put into global scope
            global[node.path as any] = node
        }
    }

    function declarePattern(node: Pattern) {
        if (Declarator.is(node)) {
            declare(node)
        }
        else if (RestElement.is(node)) {
            declare(node.argument)
        }
        else if (ObjectPattern.is(node)) {
            for (let property of node.properties) {
                if (RestElement.is(property)) {
                    declarePattern(property)
                }
                else {
                    if (Reference.is(property.value)) {
                        declare(property.value)
                    }
                    else if (Pattern.is(property.value)) {
                        declarePattern(property.value)
                    }
                }
            }
        }
        else if (ArrayPattern.is(node)) {
            for (let element of node.elements) {
                if (element != null) {
                    declarePattern(element)
                }
            }
        }
        else if (AssignmentPattern.is(node)) {
            declarePattern(node.left)
        }
        else {
            throw SemanticError(`TODO: Handle this Pattern: ${node.constructor.name}`, node)
        }
    }

    traverse(root, {
        enter(node, ancestors, path) {
            if (ancestorsMap) {
                let ancestor: Node | null = null
                for (let i = ancestors.length - 1; i >= 0; i--) {
                    if (Node.is(ancestors[i])) {
                        ancestor = ancestors[i]
                        break
                    }
                }
                ancestorsMap.set(node, ancestor!)
            }
            if (options.implements && ClassDeclaration.is(node)) {
                options.implements.push([node.id, types.Object, ...node.baseClasses as Array<Reference>])
            }
            //  do nothing on Parameters, they're handled by their containing functions
            if (File.is(node)) {
                // programs declare their id into the global scope, before pushing their own scope
                declarePattern(node.id)
            }
            //  get the current scope
            let scope = scopes[scopes.length - 1]
            //  save a map from this nodes location to it's scope
            map.set(node, scope)
            // if (pathMap) {
            //     pathMap.set(node, path.slice(0))
            // }
            function pushScope() {
                scopes.push(scope = { __proto__: scope, __source: node.constructor.name + " => " + JSON.stringify(node.location ?? "NULL") })
            }

            if (Parameter.is(node)) {
                return
            }

            //  if this node is a scope then we push a new scope
            if (Scope.is(node)) {
                pushScope()
                // console.log('++++')
            }

            //  declarations set themselves in scope
            if (Pattern.is(node)) {
                declarePattern(node)
            }

            // if (ImportDefaultSpecifier.is(node)) {
            //     console.log({ import: node })
            // }

            //  functions set their parameters in scope
            if (FunctionExpression.is(node)) {
                for (let parameter of node.params) {
                    declarePattern(parameter.id)
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