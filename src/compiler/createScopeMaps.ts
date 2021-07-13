import { traverse, skip } from "@glas/traverse"
import { SemanticError } from "./common"
import { Node, Scope, Identifier, Reference, Declarator, Pattern, Parameter, ObjectPattern, RestElement, ArrayPattern, FunctionExpression } from "./ast"

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
export default function createScopeMaps(root, callback?: (current: Declarator, source: Pattern, previous?: Declarator) => void): ScopeMaps {
    let map = new Map()
    let scopes: object[] = []

    function declare(node: Declarator, source: Pattern) {
        let scope: any = scopes[scopes.length - 1]
        if (callback) {
            let previous = scope[node.name]
            callback(node, source, previous)
        }
        scope[node.name] = node
    }

    function declarePattern(node: Pattern, source: Pattern) {
        if (Declarator.is(node)) {
            declare(node, source)
        }
        else if (RestElement.is(node)) {
            declare(node.argument, source)
        }
        else if (ObjectPattern.is(node)) {
            for (let property of node.properties) {
                if (RestElement.is(property)) {
                    declarePattern(property, source)
                }
                else {
                    if (Reference.is(property.value)) {
                        declare(property.value, source)
                    }
                    else if (Pattern.is(property.value)) {
                        declarePattern(property.value, source)
                    }
                }
            }
        }
        else if (ArrayPattern.is(node)) {
            for (let element of node.elements) {
                if (element != null) {
                    declarePattern(element, node)
                }
            }
        }
        else {
            throw SemanticError(`TODO: Handle this Pattern: ${node.constructor.name}`, node)
        }
    }

    traverse(root, {
        enter(node) {
            //  get the current scope
            let scope = scopes[scopes.length - 1]
            //  save a map from this nodes location to it's scope
            map.set(node, scope)
            function pushScope() {
                scopes.push(scope = { __proto__: scope, __source: node.constructor.name + " => " + JSON.stringify(node.location ?? "NULL") })
            }

            if (Parameter.is(node)) {
                return skip
            }

            //  if this node is a scope then we push a new scope
            if (Scope.is(node)) {
                pushScope()
            }

            //  declarations set themselves in scope
            if (Pattern.is(node)) {
                declarePattern(node, node)
            }

            //  functions set their parameters in scope
            if (FunctionExpression.is(node)) {
                for (let parameter of node.parameters) {
                    declarePattern(parameter.id, node)
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