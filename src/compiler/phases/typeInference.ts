import { Phase } from "./Phase";
import { Scope } from "../ast/Scope";
import { traverseWithScope } from "./createScopeMaps";
import { Expression } from "../ast/Expression";

//     [Call, (call: Call, c: EvaluationContext) => {
//         if (call.type == null && call.callee instanceof Reference && call.nodes.every(node => node.type != null)) {
//             const argTypes = call.nodes.map(arg => arg.type!);
//             const callee = c.getValue(call.callee);
//             if (!isCallable(callee)) {
//                 throw new SemanticError(`Value is not callable`, call.callee);
//             }
//             const type = callee.getReturnType(argTypes);
//             const result = call.patch({ type });
//             return result;

//             // const native = getMetaCall(callee, coreTypes.Native);
//             // if (call.nodes.length === 2) {
//             //     switch (call.callee.name) {
//             //         case "+":
//             //             const a = call.nodes[0].type;
//             //             const b = call.nodes[1].type;
//             //             // let min = a.min && b.min ? new BinaryExpression({ left: a.min, operator, right: b.min }) : null
//             //             // let max = a.max && b.max ? new BinaryExpression({ left: a.max, operator, right: b.max }) : null
//             //             // let minExclusive = a.minExclusive || b.minExclusive
//             //             // let maxExclusive = a.maxExclusive || b.maxExclusive
//             //             // return new NumberType({
//             //             //     min: min ? evaluate(min, c) : null,
//             //             //     max: max ? evaluate(max, c) : null,
//             //             //     minExclusive,
//             //             //     maxExclusive,
//             //             // })
//             //     }
//             // }
//         }
//     }],
//     // ...simplifyConverters,
//     // ...constantEvaluationConverters,
// ] as any);

export function typeInference(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
    // return converterPhase(moduleName, module, externals);
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
