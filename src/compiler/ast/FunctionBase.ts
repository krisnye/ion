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
import { SemanticError } from "../SemanticError";
import { removeSSAVersions } from "../phases/ssaForm";

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

    areArgumentsValid(argTypes: Type[], c: EvaluationContext, errors = new Array<Error>()) : boolean {
        if (argTypes.length !== this.parameters.length) {
            return false;
        }
        for (let i = 0; i < argTypes.length; i++) {
            let argType = removeSSAVersions(argTypes[i]);
            let paramType = removeSSAVersions(this.parameters[i].declaredType);
            if (paramType != null) {
                let result = isSubtype(argType, paramType, c);
                if (!result) {
                    // console.log({ argType, paramType });
                    errors.push(new SemanticError(`Argument of type ${argType} ${result === false ? `is not` : `may not be`} a valid parameter type ${paramType}`, argType));
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