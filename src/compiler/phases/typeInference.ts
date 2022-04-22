import { Phase } from "./Phase";
import { Scope } from "../ast/Scope";
import { traverseWithScope } from "./createScopeMaps";
import { Expression } from "../ast/Expression";

export function typeInference(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    let errors!: Error[];
    let modifications = 0;
    let result = traverseWithScope(module, (c) => {
        errors = c.errors;
        return {
            leave(node) {
                if (node instanceof Expression && !node.resolved) {
                    let _original = node;
                    node = node.maybeResolve(c);
                    if (node !== _original) {
                        modifications++;
                    }
                }
                return node;
            }
        }
    }, externals);
    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];

}
