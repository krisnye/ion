import { memoize } from "../functional"
import traverseWithScopedVariables from "./traverseWithScopedVariables"
const { ast } = require("../ion")

//  TODO: Convert references to global references
export default memoize(function(module) {
    // let referencesToRoot
    let unresolved = new Map<string, any>()
    traverseWithScopedVariables(module,
        function enter(node, ancestors, path, scope) {
            if (ast.Reference.is(node)) {
                if (!scope.has(node.name) && !unresolved.has(node.name)) {
                    // console.log({unresolved:node.name, path:path.join()})
                    unresolved.set(node.name, node)
                }
            }
        }
    )
    return unresolved
})
