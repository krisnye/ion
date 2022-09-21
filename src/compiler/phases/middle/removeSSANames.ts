import { Identifier } from "../../ast/Identifier";
import { Reference } from "../../ast/Reference";
import { Variable } from "../../ast/Variable";
import { traverseWithScope } from "../frontend/createScopeMaps";
import { getSSAOriginalName } from "../frontend/ssaForm";
import { Phase } from "../Phase";
import { replace } from "../../traverse";
import { defaultExportName } from "../../pathFunctions";
import { Function } from "../../ast/Function";

export function removeSSANames(moduleName, module, externals): ReturnType<Phase> {
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof Variable) {
                    if (node.conditional || node.phi) {
                        node = replace();
                    }
                }
                if (node instanceof Reference || (node instanceof Identifier) && !(parent instanceof Function)) {
                    // rename the main name to "export".
                    let name: string;
                    if (node.name === moduleName) {
                        name = defaultExportName;
                    }
                    else {
                        name = getSSAOriginalName(node.name);
                    }

                    
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
