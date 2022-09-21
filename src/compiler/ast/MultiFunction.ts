import { EvaluationContext } from "../EvaluationContext";
import { Call } from "./Call";
import { Container } from "./Container";
import { Expression } from "./Expression";
import { Function, FunctionProps } from "./Function";
import { Type } from "./Type";
import { UnionType } from "./UnionType";

function isFunction(f): f is Function {
    return f instanceof Function;
}

export function getReturnType(source: Call, funcs: Function[], args: Expression[], argTypes: Type[], c: EvaluationContext): Type | null {
    let possibleFunctionCalls = getPossibleFunctionCalls(funcs, args, argTypes, c);
    let returnTypes = possibleFunctionCalls.filter(isFunction).map(func => func.getReturnType(source, argTypes, c));
    return UnionType.join(...returnTypes);
}

export function getPossibleFunctionCalls(funcs: (Expression | null)[], args: Expression[], argTypes: Type[], c: EvaluationContext, errors: Error[] = []): Function[] {
    let functions = new Array<Function>();
    for (let func of funcs) {
        //  we only want to keep the first function errors.
        if (func instanceof Function) {
            //  Really, if these functions are sorted
            //  and we know that arguments will ALWAYS be of the correct type
            //  then we can only return the first successful result.
            if (func.areArgumentsValid(args, argTypes, c, errors.length > 0 ? [] : errors)) {
                functions.push(func);
            }
        }
        else if (func instanceof Function) {
            //  if not a function yet... it's possibly callable later
            functions.push(func);
        }
    }
    // if (funcErrors.length > 0 && funcs.length  === 1) {
    //     throw funcErrors[0];
    // }
    return functions;
}

export interface MultiFunctionProps extends FunctionProps {
    functions: Function[]
}

export class MultiFunction extends Expression {

    functions!: Function[];

    constructor(props: MultiFunctionProps) { super({ ...props }); }
    patch(props: Partial<MultiFunctionProps>) { return super.patch(props); }

    toString() {
        return Container.toString(this.functions, "<", ">");
    }

}