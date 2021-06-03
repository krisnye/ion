import createScopeMaps from "../createScopeMaps";
import Assembly from "../ast/Assembly";
import { traverse } from "../Traversal";
import { SemanticError } from "../common";
import Reference from "../ast/Reference";
import Analysis from "../ast/Analysis";

export default function checkReferences(root: Assembly | Analysis) {
    let scopes = createScopeMaps(root)
    traverse(root, {
        enter(node) {
            if (Reference.is(node)) {
                let scope = scopes.get(node)
                let declaration = scope[node.name]
                if (declaration == null) {
                    console.log(`Reference not found: ${node.name}`)
                    // throw SemanticError(`Reference not found: ${node.name}`, node)
                }
            }
        }
    })
    return root
}
