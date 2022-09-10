import { Identifier } from "../../../ast/Identifier";
import { Reference } from "../../../ast/Reference";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";
import { getLastName } from "../../../pathFunctions";
import { Function } from "../../../ast/Function";

export function renameExternals(moduleName, module, externals): ReturnType<Phase> {
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof Reference || (node instanceof Identifier) && !(parent instanceof Function)) {
                    // rename the main name to "export".
                    let name = getLastName(node.name);
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
