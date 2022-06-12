import { Variable } from "./Variable";
import { Container } from "./Container";
import { MetaContainer } from "./MetaContainer";
import { MetaCall } from "./Call";
import { isType, Type } from "./Type";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { Scope } from "./Scope";
import { Node } from "../Node";

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

    areArgumentsValid(argTypes: Type[], c: EvaluationContext) : boolean {
        if (argTypes.length !== this.parameters.length) {
            return false;
        }
        for (let i = 0; i < argTypes.length; i++) {
            let argType = argTypes[i];
            let paramType = this.parameters[i].declaredType;
            // if (!isType(paramType)) {
            //     throw new Error("ParamType not known yet");
            // }
            if (paramType != null && !isSubtype(argType, paramType, c)) {
                return false;
            }
        }
        return true;
    }

    toString() {
        return this.returnType
            ? `${Container.toString(this.parameters, "(", ")")} ${this.resolved ? '::' : ':'} ${this.returnType}`
            : `${Container.toString(this.parameters, "(", ")")}`;
    }

}