import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
const { ast } = require("../ion")


/**
 * Returns a Map which will contain a scope object with variable names returning Declarations.
 * @param root the ast
 */
export default function createScopeMap(root): Map<any,any> {
    let map = new Map()
    let scopes: object[] = []

    function declare(node, id = node.id) {
        let scope = scopes[scopes.length - 1]
        scope[id.name] = node
        // console.log('+ ' + id.name)
    }

    traverse(root, {
        enter(node) {
            //  get the current scope
            let scope = scopes[scopes.length - 1]
            //  save a map from this node to it's scope
            map.set(node, scope)
            //  if this node is a scope then we push a new scope
            if (ast.Scope.is(node)) {
                // console.log('++++')
                scopes.push(scope = { __proto__: scope })
            }

            //  let's check that referenced identifiers are in scope
            if (ast.Reference.is(node)) {
                let declaration = scope[node.name]
                if (declaration == null) {
                    throw SemanticError(`Cannot use variable '${node.name}' before declaration.`, node.location)
                }
            }

            //  declarations set themselves in scope
            if (ast.Declaration.is(node)) {
                declare(node)
            }

            //  functions set their parameters in scope
            if (ast.FunctionExpression.is(node)) {
                for (let parameter of node.parameters) {
                    declare(parameter)
                }
            }
        },
        leave(node) {
            if (ast.Scope.is(node)) {
                // console.log('----')
                scopes.pop()
            }
        }
    })

    return map
}