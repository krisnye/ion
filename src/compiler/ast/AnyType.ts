import { timeStamp } from "console";
import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { LogicalOperators } from "../analysis/LogicalOperators";
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

    isInstance(c: InterpreterContext, value: InterpreterValue): boolean {
        return true;
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
            operator: LogicalOperators.equals,
            right: dot
        });
    }

    toString() {
        return `Any`;
    }

}