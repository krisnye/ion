import Assembly from "../ast/Assembly";
import { Options } from "../Compiler";
import { getLocalName } from "../common";
import { traverse } from "../Traversal";
import Id from "../ast/Id";

export default function convertRefsToLocal(root: Assembly, options: Options) {
    //  First we convert any refences to other declarations within the same module
    //  into absolute references
    return traverse(root, {
        leave(node, ancestors, path) {
            let moduleName = path[1]
            if (Id.is(node)) {
                let localName = getLocalName(node.name, moduleName)
                if (localName != null) {
                    return node.patch({ name: localName })
                }
            }
        }
    })
}