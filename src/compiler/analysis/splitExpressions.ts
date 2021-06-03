import { BinaryExpression, Expression } from "../ast"

export default function *splitExpressions(e: Expression, operator: string = "&&"): Iterable<Expression> {
    if (BinaryExpression.is(e) && e.operator === operator) {
        yield* splitExpressions(e.left, operator)
        yield* splitExpressions(e.right, operator)
    }
    else {
        yield e
    }
}
