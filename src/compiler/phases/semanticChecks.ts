import { Expression } from "../ast/Expression";
import { Group } from "../pst/Group";
import { SemanticError } from "../SemanticError";
import { traverse } from "../traverse";
import { Phase } from "./Phase";

export function semanticChecks(moduleName, module): ReturnType<Phase> {

    module = traverse(module, {
        leave(node, ancestors) {
            if (node instanceof Group) {
                if (!(node.value instanceof Expression)) {
                    throw new SemanticError(`Expected expression`, node.value!);
                }
                return node.value!;
            }
        }
    });
    return [module, []];
}
