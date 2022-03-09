import { Scope } from "../ast/Scope";
import { Sequence } from "../pst/Sequence";
import { Phase } from "./Phase";
import { traverse } from "./traverse";

export function flattenSequences(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node) {
            if (node instanceof Scope) {
                let nodes = Sequence.flatten(node.nodes);
                if (nodes.length != node.nodes.length) {
                    return node.patch({ ...node, nodes });
                }
            }
        }
    })
    return [result, errors];
}
