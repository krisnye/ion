import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { Reference } from "./Reference";
import { BasicType, Type } from "./Type";

export interface FunctionTypeProps extends FunctionBaseProps {
}

export class FunctionType extends FunctionBase implements Type {

    constructor(props: FunctionTypeProps) { super(props); }
    patch(props: Partial<FunctionTypeProps>) { return super.patch(props); }

    isInstance(c: InterpreterContext, value: InterpreterValue): boolean {
        throw new Error(`${this.constructor.name}.isInstance not implemented: ${this}`);
    }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }

    getBasicTypes(c: EvaluationContext) {
        return BasicType.Function;
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