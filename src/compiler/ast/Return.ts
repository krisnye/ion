import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { InterpreterContext } from "../../interpreter/InterpreterContext";

export interface ReturnProps extends ExpressionProps {
    value: Expression;
}

export class Return extends Expression {

    value!: Expression;

    constructor(props: ReturnProps) { super(props); }
    patch(props: Partial<ReturnProps>) { return super.patch(props); }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        c.returnValue = this.value.toInterpreterValue(c)!;
    }

    toString() {
        return `return ${this.value}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "ReturnStatement",
            argument: this.value.toESNode(c)
        }
    }

}
