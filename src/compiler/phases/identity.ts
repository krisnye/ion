import { traverse } from "@glas/traverse";
import { Literal } from "../ast";

export default function identity(root) {
    // traverse(root, {
    //     leave(node) {
    //         if (node.type === "Literal") {
    //             console.log(node)
    //         }
    //     }
    // })
    return root
}
