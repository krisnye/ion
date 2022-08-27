import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";

export interface ReturnProps extends ExpressionProps {
    value: Expression;
}

export class Return extends Expression {

    value!: Expression;

    constructor(props: ReturnProps) { super(props); }
    patch(props: Partial<ReturnProps>) { return super.patch(props); }

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
