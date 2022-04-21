import { Phase } from "./Phase";
import { Variable } from "../ast/Variable";
import { Function } from "../ast/Function";
import { traverse } from "../traverse";

export function moveMetaToFunctions(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node) {
            if (node instanceof Variable && node.value instanceof Function && node.meta.length > 0) {
                node = node.patch({ meta: [], value: node.value.patch({ meta: [...node.value.meta, ...node.meta] }) });
            }
            return node;
        }
    })
    return [result, errors];
}
