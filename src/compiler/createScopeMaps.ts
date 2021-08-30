import { traverse, skip } from "@glas/traverse"
import { SemanticError } from "./common"
import { Node, Scope, Reference, Declarator, Pattern, ObjectPattern, RestElement, ArrayPattern, FunctionExpression } from "./ast"

export type NodeMap<T> = {
    get(node: Node): T
    set(node: Node, t: T)
}

export type ScopeMap = { [id: string]: Declarator }
export type ScopeMaps = NodeMap<ScopeMap>

/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMaps(root, callback?: (current: Declarator, source: Pattern, ancestors: any[], previous?: Declarator) => void): ScopeMaps {
    let map = new Map()
    let scopes: object[] = []

    function declare(node: Declarator, source: Pattern, ancestors: any[]) {
        let scope: any = scopes[scopes.length - 1]
        if (callback) {
            let previous = scope[node.name]
            callback(node, source, ancestors, previous)
        }
        scope[node.name] = node
    }

    function declarePattern(node: Pattern, source: Pattern, ancestors: any[]) {
        if (Declarator.is(node)) {
            declare(node, source, ancestors)
        }
        else if (RestElement.is(node)) {
            declare(node.value, source, ancestors)
        }
        else if (ObjectPattern.is(node)) {
            for (let property of node.properties) {
                if (RestElement.is(property)) {
                    declarePattern(property, source, ancestors)
                }
                else {
                    if (Reference.is(property.value)) {
                        declare(property.value, source, ancestors)
                    }
                    else if (Pattern.is(property.value)) {
                        declarePattern(property.value, source, ancestors)
                    }
                }
            }
        }
        else if (ArrayPattern.is(node)) {
            for (let element of node.elements) {
                if (element != null) {
                    declarePattern(element, node, ancestors)
                }
            }
        }
        else {
            throw SemanticError(`TODO: Handle this Pattern: ${node.constructor.name}`, node)
        }
    }

    traverse(root, {
        enter(node, ancestors) {
            if (!Node.is(node)) {
                return
            }
            //  get the current scope
            let scope = scopes[scopes.length - 1]
            //  save a map from this nodes location to it's scope
            map.set(node, scope)
            // console.log("----", { node, scope })
            // map.set(node.$, scope)
            function pushScope() {
                scopes.push(scope = { __proto__: scope, __source: node.constructor.name + " => " + JSON.stringify(node.location ?? "NULL") })
            }

            // if (Parameter.is(node)) {
            //     return skip
            // }

            //  if this node is a scope then we push a new scope
            if (Scope.is(node)) {
                pushScope()
            }

            //  declarations set themselves in scope
            if (Pattern.is(node)) {
                declarePattern(node, node, ancestors)
            }

            // //  functions set their parameters in scope
            // if (FunctionExpression.is(node)) {
            //     for (let parameter of node.parameters) {
            //         declarePattern(parameter.id, node)
            //     }
            // }
        },
        leave(node) {
            if (Scope.is(node)) {
                scopes.pop()
            }
        }
    })

    return map
}