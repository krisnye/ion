import { Expression } from "../../../ast/Expression";
import { Variable } from "../../../ast/Variable";
import { traverse } from "../../../traverse";
import { Phase } from "../../Phase";

export function removeCompileTimeTypes(moduleName, module, externals): ReturnType<Phase> {
    module = traverse(module, {
        leave(node) {
            if (node instanceof Expression) {
                if (node instanceof Variable) {
                    // leave type on
                }
                else if (node.type != null) {
                    //  remove type
                    node = node.patch({ type: null });
                }
            }
            return node;
        }
    });
    return [module, []];
}
