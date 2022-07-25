import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";

export interface LiteralProps extends ExpressionProps {
    value: any;
}

export abstract class Literal extends Expression {

    value!: any;

    constructor(props: LiteralProps) { super(props); }
    patch(props: Partial<LiteralProps>) { return super.patch(props); }

    toString() {
        throw new Error("not implemented");
    }

    toESNode(c: EvaluationContext) {
        if (typeof this.value === "number" && this.value < 0) {
            return {
                type: "UnaryExpression",
                operator: "-",
                argument: {
                    type: "Literal",
                    value: - this.value,
                }
            }
        }
        return {
            type: "Literal",
            value: this.value,
        }
    }

}