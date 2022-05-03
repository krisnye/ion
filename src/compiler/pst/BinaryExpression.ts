import { Expression, ExpressionProps } from "../ast/Expression";
import { Identifier } from "../ast/Identifier";
import { infixPrecedence } from "../parser/operators";
import { Token } from "../Token";

export interface BinaryExpressionProps extends ExpressionProps {
    left: Expression | Identifier;
    operator: Token;
    right: Expression | Identifier;
}
export class BinaryExpression extends Expression {

    left!: Expression | Identifier;
    operator!: Token;
    right!: Expression | Identifier;

    constructor(props: BinaryExpressionProps) { super(props); }
    patch(props: Partial<BinaryExpressionProps>) { return super.patch(props); }

    getPrecedence() {
        return infixPrecedence[this.operator.value]!;
    }

    toString() {
        return `${this.left} ${this.operator} ${this.right}`;
    }

    static *split(e: Expression, operator: string): Iterable<Expression> {
        if (e instanceof BinaryExpression && e.operator.value === operator) {
            yield* BinaryExpression.split(e.left as Expression, operator)
            yield* BinaryExpression.split(e.right as Expression, operator)
        }
        else {
            yield e
        }
    }

}

