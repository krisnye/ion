import { Container } from "../../ast/Container";
import { Expression } from "../../ast/Expression";
import { Return } from "../../ast/Return";
import { Group } from "../../pst/Group";
import { SemanticError } from "../../SemanticError";
import { traverse } from "../../traverse";
import { Phase } from "../Phase";

export function semanticChecks(moduleName, module): ReturnType<Phase> {
    let errors: Error[] = [];
    module = traverse(module, {
        leave(node, ancestors) {
            //  no empty Group??
            if (node instanceof Group) {
                if (!(node.value instanceof Expression)) {
                    errors.push(new SemanticError(`Expected expression`, node.value!));
                }
                return node.value!;
            }
            //  no expressions after return
            if (node instanceof Container) {
                let returnIndex = node.nodes.findIndex(n => n instanceof Return);
                if (returnIndex >= 0) {
                    let next = node.nodes[returnIndex + 1];
                    if (next != null) {
                        errors.push(new SemanticError(`Unreachable code detected after return`, next));
                    }
                }
            }
        }
    });
    return [module, errors];
}
