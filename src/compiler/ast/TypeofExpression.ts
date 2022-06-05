import { timeStamp } from "console";
import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { BasicType, isType, Type } from "./Type";

export interface TypeofExpressionProps extends BaseTypeProps {
    value: Expression
}

export class TypeofExpression extends BaseType {

    value!: Expression

    constructor(props: TypeofExpressionProps) { super(props); }
    patch(props: Partial<TypeofExpressionProps>) {
        return super.patch(props);
    }

    *getDependencies(c: EvaluationContext) {
        yield this.value;
    }

    protected resolve(c: EvaluationContext): Expression {
        return this.value.type!;
    }

    getBasicTypes() {
        return BasicType.Type;
    }

    // toComparisonType(c: EvaluationContext) {
    // }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        throw new Error("Not implemented");
    }

    toString() {
        return `typeof ${this.value}`;
    }

}