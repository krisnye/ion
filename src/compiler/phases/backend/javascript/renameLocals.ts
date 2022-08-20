import { Identifier } from "../../../ast/Identifier";
import { Reference } from "../../../ast/Reference";
import { Variable } from "../../../ast/Variable";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { getSSAOriginalName } from "../../frontend/ssaForm";
import { Phase } from "../../Phase";
import { replace } from "../../../traverse";

export function renameLocals(moduleName, module, externals): ReturnType<Phase> {
    let debug = moduleName === "test.sample";
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Variable) {
                    if (node.conditional || node.phi) {
                        node = replace();
                    }
                }
                if (node instanceof Reference || node instanceof Identifier) {
                    let name = getSSAOriginalName(node.name);
                    if (name !== node.name) {
                        node = node.patch({ name });
                    }
                }
                return node;
            }
        }
    })
    return [module, []];
}
