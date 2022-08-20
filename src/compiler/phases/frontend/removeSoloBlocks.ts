import { Block } from "../../ast/Block";
import { Phase } from "../Phase";
import { traverse } from "../../traverse";

function removeSoloBlock(node) {
    return (node.constructor === Block && node.nodes.length === 1) ? node.nodes[0] : node;
}

export function removeSoloBlocks(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node, ancestors) {
            return removeSoloBlock(node);
        }
    })
    return [result, errors];
}
