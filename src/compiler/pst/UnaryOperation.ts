import { Expression, ExpressionProps } from "../ast/Expression";
import { Token } from "../Token";

export interface UnaryOperationProps extends ExpressionProps {
    operator: Token;
    value: Expression;
}
export class UnaryOperation extends Expression {

    operator!: Token;
    value!: Expression;

    constructor(props: UnaryOperationProps) { super(props); }
    patch(props: Partial<UnaryOperationProps>) { return super.patch(props); }

    toString() {
        return `${this.operator} ${this.value}`;
    }

}