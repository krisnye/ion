import { ArrayExpression } from "../../ast/ArrayExpression";
import { addMetaCallsToContainers } from "../../ast/MetaContainer";
import { Container } from "../../ast/Container";
import { Group } from "../../pst/Group";
import { Sequence } from "../../pst/Sequence";
import { tokenTypes } from "../../tokenizer/TokenType";
import { Phase } from "../Phase";
import { traverse } from "../../traverse";

export function flattenSequencesAddMeta(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node, ancestors) {
            
            const parent = ancestors[ancestors.length - 1];
            // if (node instanceof Function && node.id == null && parent instanceof Variable) {
            //     node = node.patch({ id: parent.id });
            // }

            if (node instanceof Group) {
                if (node.open.type === tokenTypes.OpenBracket.name) {
                    node = new ArrayExpression({
                        location: node.location,
                        nodes: Sequence.flatten(node.value),
                        openToken: node.open,
                        closeToken: node.close,
                    })
                }
            }
            else if (node instanceof Container) {
                let nodes = Sequence.flatten(...node.nodes);
                nodes = addMetaCallsToContainers(nodes, errors);
                if (nodes.length != node.nodes.length) {
                    node = node.patch({ ...node, nodes });
                }
            }
            
            return node;
        }
    })
    return [result, errors];
}
