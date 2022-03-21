import { traverse } from "./traverse";
import { Phase } from "./Phase";
import { Block } from "../ast/Block";

export function removeSoloBlocks(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverse(module, {
        leave(node) {
            if (node.constructor === Block && node.nodes.length === 1) {
                return node.nodes[0];
            }
            return node;
        }
    })
    return [result, errors];
}