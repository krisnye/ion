import { Phase } from "./Phase";
import { Container } from "../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { Expression } from "../ast/Expression";
import { Function } from "../ast/Function";
import { skip } from "../traverse";

export function isInferFunction(node): node is Function {
    return node.parameters.some(p => p.declaredType == null);
}

export function typeInference(moduleName, module, externals: Map<string, Container>): ReturnType<Phase> {
    let errors!: Error[];
    let modifications = 0;
    let result = traverseWithScope(externals, module, (c) => {
        errors = c.errors;
        return {
            enter(node) {
                if (node instanceof Function) {
                    if (isInferFunction(node)) {
                        //  we don't type analyze infer functions.
                        //  they have to be instantiated per type before analysis
                        return skip;
                    }
                }
            },
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
    });
    let runPhaseAgain = modifications > 0;
    return [result, errors, runPhaseAgain];

}
