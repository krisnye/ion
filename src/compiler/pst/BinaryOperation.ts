import { Expression, ExpressionProps } from "../ast/Expression";
import { Identifier } from "../ast/Identifier";
import { infixPrecedence } from "../parser/operators";
import { Token } from "../Token";

export interface BinaryOperationProps extends ExpressionProps {
    left: Expression | Identifier;
    operator: Token;
    right: Expression | Identifier;
}
export class BinaryOperation extends Expression {

    left!: Expression | Identifier;
    operator!: Token;
    right!: Expression | Identifier;

    constructor(props: BinaryOperationProps) { super(props); }
    patch(props: Partial<BinaryOperationProps>) { return super.patch(props); }

    getPrecedence() {
        return infixPrecedence[this.operator.value]!;
    }

    toString() {
        return `${this.left} ${this.operator} ${this.right}`;
    }

}