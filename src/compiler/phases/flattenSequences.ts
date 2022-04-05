import { ArrayExpression } from "../ast/ArrayExpression";
import { addMetaCallsToContainers } from "../ast/MetaContainer";
import { Scope } from "../ast/Scope";
import { Group } from "../pst/Group";
import { Sequence } from "../pst/Sequence";
import { tokenTypes } from "../tokenizer/TokenType";
import { Phase } from "./Phase";
import { traverse } from "../traverse";

export function flattenSequences(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node) {
            if (node instanceof Group) {
                if (node.open.type === tokenTypes.OpenBracket.name) {
                    return new ArrayExpression({
                        location: node.location,
                        nodes: Sequence.flatten(node.value)
                    })
                }
            }
            else if (node instanceof Scope) {
                let nodes = Sequence.flatten(...node.nodes);
                nodes = addMetaCallsToContainers(nodes, errors);
                if (nodes.length != node.nodes.length) {
                    return node.patch({ ...node, nodes });
                }
            }
        }
    })
    return [result, errors];
}
