import { traverse } from "./traverse";
import { Phase } from "./Phase";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { Literal } from "../ast/Literal";
import { coreTypes } from "../coreTypes";
import { FloatLiteral } from "../ast/FloatLiteral";
import { StringLiteral } from "../ast/StringLiteral";
import { Reference } from "../ast/Reference";

export function simplify(moduleName, module): ReturnType<Phase> {
    let errors = new Array<Error>();
    let modifications = 0;
    let result = traverse(module, {
        leave(node) {
            let _original = node;
            let { location } = node;
            if (node instanceof Literal && node.type == null) {
                let typeName: string
                if (node instanceof IntegerLiteral) {
                    typeName = coreTypes.integer;
                }
                if (node instanceof FloatLiteral) {
                    typeName = coreTypes.float;
                }
                if (node instanceof StringLiteral) {
                    typeName = coreTypes.string;
                }
                node = node.patch({ type: new Reference({ location, name: typeName! })})
            }
            if (node !== _original) {
                modifications++;
            }
            return node;
        }
    })
    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];
}