import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { Expression, ExpressionProps } from "../ast/Expression";
import { EvaluationContext } from "../EvaluationContext";
import { SourceLocation } from "../SourceLocation";
import { NumberType } from "./NumberType";
import { Reference } from "./Reference";
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

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        switch (this.operator) {
            case "&&":
                return new InterpreterInstance(c.isTrue(this.left.toInterpreterValue(c)!) && c.isTrue(this.right.toInterpreterValue(c)!));
            case "||":
                return new InterpreterInstance(c.isTrue(this.left.toInterpreterValue(c)!) || c.isTrue(this.right.toInterpreterValue(c)!));
            case "is":
                let left = this.left.toInterpreterValue(c)!;
                let right = this.right.toInterpreterValue(c) as Type;
                return new InterpreterInstance(right.isInstance(c, left));
            default:
                throw new Error("Operator not implemented yet: " + this.operator);
        }
        throw new Error(`${this.constructor.name}.toInterpreterValue not implemented: ${this}`);
    }

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
        if (this.operator === "is") {
            if (this.right instanceof Reference) {
                switch (this.right.name) {
                    case "String":
                    case "Number":
                    return {
                        type: "BinaryExpression",
                        left: {
                            type: "UnaryExpression",
                            operator: "typeof",
                            argument: this.left.toESNode(c),
                            prefix: true
                        },
                        operator: "===",
                        right: {
                            type: "Literal",
                            value: this.right.name.toLowerCase(),
                        }
                    }
                    case "Integer":
                    return {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            object: { type: "Identifier", name: "Number" },
                            property: { type: "Identifier", name: "isInteger" }
                        },
                        arguments: [this.left.toESNode(c)],
                    }
                    default:
                    return {
                        type: "CallExpression",
                        callee: {
                            type: "MemberExpression",
                            object: this.right.toESNode(c),
                            property: { type: "Identifier", name: "is" }
                        },
                        arguments: [this.left.toESNode(c)],
                    }
                }
            }
            else {
                if (this.right instanceof NumberType) {
                    return this.right.toDotExpression(c, this.left).toESNode(c);
                }
            }
        }
        return {
            type: "BinaryExpression",
            left: this.left.toESNode(c),
            operator: this.operator,
            right: this.right.toESNode(c)
        };
    }

}

