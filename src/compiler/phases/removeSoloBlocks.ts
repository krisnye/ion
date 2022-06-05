import { Block } from "../ast/Block";
import { Phase } from "./Phase";
import { traverse } from "../traverse";
import { Conditional } from "../ast/Conditional";
import { Function } from "../ast/Function";

function removeSoloBlock(node) {
    return (node.constructor === Block && node.nodes.length === 1) ? node.nodes[0] : node;
}

export function removeSoloBlocks(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node, ancestors) {
            let parent = ancestors[ancestors.length - 1];
            let retainBlock = parent instanceof Conditional;
            if (!retainBlock) {
                return removeSoloBlock(node);
            }
        }
    })
    return [result, errors];
}
