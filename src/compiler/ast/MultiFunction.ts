import { EvaluationContext } from "../EvaluationContext";
import { Call } from "./Call";
import { Expression } from "./Expression";
import { Function } from "./Function";
import { Type } from "./Type";
import { UnionType } from "./UnionType";

export function getReturnType(source: Call, funcs: Function[], args: Expression[], argTypes: Type[], c: EvaluationContext): Type | null {
    let possibleFunctionCalls = getPossibleFunctionCalls(funcs, args, argTypes, c);
    let returnTypes = possibleFunctionCalls.map(func => func.getReturnType(source, argTypes, c));
    return UnionType.join(...returnTypes);
}

export function getPossibleFunctionCalls(funcs: (Function | null)[], args: Expression[], argTypes: Type[], c: EvaluationContext): Function[] {
    let functions = new Array<Function>();
    let funcErrors = new Array<Error>();
    for (let func of funcs) {
        //  we only want to keep the first function errors.
        if (func?.areArgumentsValid(args, argTypes, c, funcErrors.length > 0 ? [] : funcErrors)) {
            functions.push(func);
        }
    }
    // if (funcErrors.length > 0 && funcs.length  === 1) {
    //     throw funcErrors[0];
    // }
    return functions;
}