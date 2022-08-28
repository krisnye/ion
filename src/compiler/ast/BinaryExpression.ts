import { Expression, ExpressionProps } from "../ast/Expression";
import { EvaluationContext } from "../EvaluationContext";
import { SourceLocation } from "../SourceLocation";
import { Type } from "./Type";

export interface BinaryExpressionProps extends ExpressionProps {
    left: typeof BinaryExpression.prototype.left;
    operator: typeof BinaryExpression.prototype.operator;
    right: typeof BinaryExpression.prototype.right;
}
/**
 * This is only used for type inference.
 */
export class BinaryExpression extends Expression {

    left!: Expression;
    operator!: string;
    right!: Expression | Type;

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

    toESNode(c: EvaluationContext) {
        return {
            type: "BinaryExpression",
            left: this.left.toESNode(c),
            operator: this.operator,
            right: this.right.toESNode(c)
        };
    }

}

