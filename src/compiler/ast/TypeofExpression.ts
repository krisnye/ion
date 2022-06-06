import { timeStamp } from "console";
import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { Reference } from "./Reference";
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
        // Variables have a declared type and an actual type
        //  when we use typeof variable
        //      do we mean declared type
        //      or do we mean the actual type?
        // if (this.value instanceof Reference) {
        //     let variable = c.getVariable(this.value);
        //     console.log("Variable")
        //     return variable.declaredType!;
        // }
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