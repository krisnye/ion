import { Phase } from "../Phase";
import { traverse } from "../../traverse";
import { Variable } from "../../ast/Variable";

export function copyIdAndMetaToFunctions(moduleName, module): ReturnType<Phase> {
    let errors = [];
    let result = traverse(module, {
        leave(node, ancestors) {
            const parent = ancestors[ancestors.length - 1];
            if (node instanceof Function && node.id == null && parent instanceof Variable) {
                node = node.patch({ id: parent.id, meta: parent.meta });
            }
            return node;
        }
    })
    return [result, errors];
}
