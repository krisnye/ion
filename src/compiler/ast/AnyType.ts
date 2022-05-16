import { timeStamp } from "console";
import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { BasicType, isType, Type } from "./Type";

export interface AnyTypeProps extends BaseTypeProps {
}

export class AnyType extends BaseType {

    constructor(props: AnyTypeProps) { super(props); }
    patch(props: Partial<AnyTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type, union: boolean) {
        return union ? this : b;
    }

    getBasicTypes() {
        return BasicType.All;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        return new BinaryExpression({
            location: this.location,
            left: dot,
            operator: TypeOperators.equals,
            right: dot
        });
    }

    toString() {
        return `Any`;
    }

}