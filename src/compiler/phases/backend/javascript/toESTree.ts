import { Module } from "../../../ast/Module";
import { skip } from "../../../traverse";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

export function toESTree(moduleName, module, externals): ReturnType<Phase> {
    module = traverseWithScope(externals, module, (c) => {
        return {
            enter(node) {
                if (node instanceof Module) {
                    return skip;
                }
            },
            leave(node) {
                if (node instanceof Module) {
                    return node.toESNode(c);
                }
            }
        }
    })
    return [module, []];
}
