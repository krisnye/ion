import { traverse } from "./traverse";
import { Phase } from "./Phase";
import { createConverter } from "../converters/Converter";
import { simplifyConverters } from "./simplify/index";

const simplifyFunction = createConverter(simplifyConverters);

export function simplify(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let modifications = 0;
    let result = traverse(module, {
        leave(node) {
            let _original = node;
            node = simplifyFunction(node);
            if (node !== _original) {
                modifications++;
            }
            return node;
        }
    })
    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];
}