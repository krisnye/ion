import { traverse } from "./traverse";
import { Phase } from "./Phase";
import { IntegerLiteral } from "../ast/IntegerLiteral";

export function simplify(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let modifications = 0;
    let result = traverse(module, {
        leave(node) {
            if (node instanceof IntegerLiteral) {
                
            }
            return node;
        }
    })
    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];
}