import { Variable } from "./Variable";
import { Container } from "./Container";
import { MetaContainer } from "./MetaContainer";
import { MetaCall, replaceParamReferencesWithArgumentTypes, toUniformArgParameterTypes } from "./Call";
import { Type } from "./Type";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { Scope } from "./Scope";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";

export interface FunctionBaseProps extends ExpressionProps {
    parameters: Variable[];
    returnType: Type | null;
    meta: MetaCall[];
}

export abstract class FunctionBase extends Expression implements MetaContainer, Scope {

    parameters!: Variable[];
    returnType!: Type | null;
    meta!: MetaCall[];

    constructor(props: FunctionBaseProps) { super(props); }
    patch(props: Partial<FunctionBaseProps>) { return super.patch(props); }

    get isScope() {
        return true;
    }

    get nodes(): Node[] {
        return this.parameters;
    }

    areArgumentsValid(args: Expression[], types: Type[], c: EvaluationContext, errors = new Array<Error>()) : boolean {
        let firstErrors = new Array<Error>();
        if (!this.areArgumentsValid_internal(args, types, c, firstErrors, false)) {
            let secondErrors = new Array<Error>();
            if (!this.areArgumentsValid_internal(args, types, c, secondErrors, true)) {
                errors.push(...firstErrors);
                return false;
            }
        }
        return true;
    }

    private areArgumentsValid_internal(args: Expression[], argTypes: Type[], c: EvaluationContext, errors = new Array<Error>(), secondTry = false) : boolean {
        if (argTypes.length !== this.parameters.length) {
            return false;
        }
        let paramTypes = toUniformArgParameterTypes(this.parameters);
        for (let i = 0; i < argTypes.length; i++) {
            let arg = args[i];
            let argType = argTypes[i];
            let paramType = paramTypes[i];
            let debug = arg.toString().startsWith("`bazzle");
            if (secondTry) {
                paramType = replaceParamReferencesWithArgumentTypes(c, argTypes, paramType).simplify(c);
            }
            if (paramType != null) {
                if (debug) {
                    debugger;
                }
                let result = isSubtype(argType, paramType, c);
                // if (debug) {
                //     console.log("RESULT!!!: " + result);
                // }
                if (result !== true) {
                    if (debug) {
                        console.log("PARAMTYPE!!!!!!!", {
                            argType: argType.toString(),
                            paramType: paramType.toString(),
                            secondTry,
                            result,
                        });
                        debugger;
                        result = isSubtype(argType, paramType, c);
                    }
                    errors.push(new SemanticError(`Argument of type ${argType} ${result === false ? `is not` : `may not be`} expected type ${paramType}`, arg));
                }
            }
        }
        return errors.length === 0;
    }

    toString() {
        return this.returnType
            ? `${Container.toString(this.parameters, "(", ")")} ${this.resolved ? '::' : ':'} ${this.returnType}`
            : `${Container.toString(this.parameters, "(", ")")}`;
    }

}