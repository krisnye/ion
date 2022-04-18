import { Block } from "../ast/Block";
import { Phase } from "./Phase";
import { traverse } from "../traverse";

export function removeSoloBlocks(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node, ancestors) {
            const parent = ancestors[ancestors.length - 1];
            if (node.constructor === Block && node.nodes.length === 1) {
                node = node.nodes[0];
            }
            return node;
        }
    })
    return [result, errors];
}
