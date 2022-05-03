import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { Reference } from "./Reference";
import { Type } from "./Type";

export interface FunctionTypeProps extends FunctionBaseProps {
}

export class FunctionType extends FunctionBase implements Type {

    constructor(props: FunctionTypeProps) { super(props); }
    patch(props: Partial<FunctionTypeProps>) { return super.patch(props); }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }
    isSubtypeOf(b: Type): boolean | null {
        // TODO: Maybe figure this out.
        return null;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        const { location } = this;
        return new BinaryExpression({
            location,
            left: dot,
            operator: TypeOperators.is,
            right: this
        });
    }

}