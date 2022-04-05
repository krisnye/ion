import { Phase } from "./Phase";
import { createConverter } from "../converters/Converter";
import { simplifyConverters } from "./simplify/index";
import { traverseWithScope } from "./createScopeMaps";
import { Scope } from "../ast/Scope";

const simplifyFunction = createConverter(simplifyConverters);

export function simplify(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    let errors = new Array<Error>();
    let modifications = 0;
    let result = traverseWithScope(module, ({ getVariable }) => {
        return {
            leave(node) {
                let _original = node;
                node = simplifyFunction(node, getVariable);
                if (Array.isArray(node)) {
                    errors.push(...node);
                    return;
                }
                if (node !== _original) {
                    modifications++;
                }
                return node;
            }
        }
    }, externals);

    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];
}