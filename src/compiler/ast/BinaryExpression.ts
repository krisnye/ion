import { Expression, ExpressionProps } from "../ast/Expression";
import { SourceLocation } from "../SourceLocation";

export interface BinaryExpressionProps extends ExpressionProps {
    left: Expression;
    operator: string;
    right: Expression;
}
/**
 * This is only used for type inference.
 */
export class BinaryExpression extends Expression {

    left!: Expression;
    operator!: string;
    right!: Expression;

    constructor(props: BinaryExpressionProps) { super(props); }
    patch(props: Partial<BinaryExpressionProps>) { return super.patch(props); }

    toString() {
        return `(${this.left} ${this.operator} ${this.right})`;
    }

    static join<T extends Expression>(operator: string, ...expressions: (T | null)[]): T | BinaryExpression {
        let values = expressions.filter(e => e != null) as T[];
        let result: BinaryExpression | T = values[0];
        for (let i = 1; i < values.length; i++) {
            let next = values[i];
            result = new BinaryExpression({
                location: SourceLocation.merge(result.location, next.location),
                left: result,
                operator,
                right: next
            });
        }
        return result;
    }

    static *split(e: Expression, operator: string): Iterable<Expression> {
        if (e instanceof BinaryExpression && e.operator === operator) {
            yield* BinaryExpression.split(e.left as Expression, operator)
            yield* BinaryExpression.split(e.right as Expression, operator)
        }
        else {
            yield e
        }
    }

}

