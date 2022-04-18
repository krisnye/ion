// import { Phase } from "./Phase";
// import { Converter, createConverterPhase } from "../converters/Converter";
// import { Scope } from "../ast/Scope";
// import { Reference } from "../ast/Reference";
// import { coreTypes } from "../coreTypes";
// import { getMetaCalls } from "../ast/MetaContainer";
// import { Variable } from "../ast/Variable";
// import { Call, isConsequent } from "../ast/Call";
// import { Node } from "../Node";
// import { ArrayExpression } from "../ast/ArrayExpression";
// import { SemanticError } from "../SemanticError";
// import { Function } from "../ast/Function";
// import { Class } from "../ast/Class";
// import { EvaluationContext } from "../EvaluationContext";

// function isMultiFunction(callee: Node, c: EvaluationContext) {
//     if (!(callee instanceof Reference)) {
//         return false;
//     }
//     let variable = c.getVariable(callee);
//     let multiFunctionMetas = getMetaCalls(variable, coreTypes.MultiFunction);
//     return multiFunctionMetas.length > 0;
// }

// function argumentsMatchParameters(args: Node[], params: Variable[]) {
//     if (args.length !== params.length) {
//         return false;
//     }
//     for (let i = 0; i < args.length; i++) {
//         let arg = args[i];
//         let param = params[i];
//         if (!isConsequent(arg.type!, param.type!)) {
//             return false;
//         }
//     }
//     return true;
// }

// function getMultiFunctionToCall(callee: ArrayExpression, args: Node[], c: EvaluationContext) {
//     for (let element of callee.nodes) {
//         let elementValue = c.getValue(element);
//         if (!(elementValue instanceof Function)) {
//             throw new SemanticError(`Expected Function`, elementValue);
//         }
//         // now check parameters
//         if (argumentsMatchParameters(args, elementValue.parameters)) {
//             return elementValue;
//         }
//     }
//     return null;
// }

// export const constantEvaluationConverters = [
//     [
//         Call,
//         (call: Call, c: EvaluationContext) => {
//             if (call.callee.constant && call.nodes.every(node => node.constant && node.type)) {
//                 // for now no meta evaluate
//                 let callee = c.getValue(call.callee);
//                 if (callee instanceof Class) {
//                     return callee.evaluate(call, c);
//                 }
//                 else if (callee instanceof Function) {
//                     console.log("EVALUATE Function!!: " + callee);
//                 }
//                 else if (callee instanceof ArrayExpression) {
//                     //  find correct function implementation
//                     //  check that has MultiFunction metadata
//                     if (!isMultiFunction(call.callee, c)) {
//                         return [new SemanticError(`Referenced operator is neither a Function nor a MultiFunction`, call.callee)];
//                     }
//                     let func = getMultiFunctionToCall(callee, call.nodes, c);
//                     if (func == null) {
//                         return [new SemanticError(`Found no function matching argument types`, call)];
//                     }
//                     return func.evaluate(call, c);
//                 }
//                 else {
//                     console.log({ callee });
//                     throw new SemanticError(`Expected Class or Function`, call.callee);
//                 }
//             }
//             return call;
//         }
//     ]
// ] as any as Converter<Node>[];

// const converterPhase = createConverterPhase(constantEvaluationConverters);

// export function constantEvaluation(moduleName, module, externals: Map<string, Scope>): ReturnType<Phase> {
//     return converterPhase(moduleName, module, externals);
// }
