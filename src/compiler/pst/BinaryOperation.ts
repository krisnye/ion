import { Expression, ExpressionProps } from "../ast/Expression";
import { infixPrecedence } from "../parser/operators";
import { Token } from "../Token";

export interface BinaryOperationProps extends ExpressionProps {
    left: Expression;
    operator: Token;
    right: Expression;
}
export class BinaryOperation extends Expression {

    left!: Expression;
    operator!: Token;
    right!: Expression;

    constructor(props: BinaryOperationProps) { super(props); }
    patch(props: Partial<BinaryOperationProps>) { return super.patch(props); }

    getPrecedence() {
        return infixPrecedence[this.operator.value]!;
    }

    toString() {
        return `${this.left} ${this.operator} ${this.right}`;
    }

}