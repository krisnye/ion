import { Expression, Reference, BinaryExpression, DotExpression, TypeExpression, Type, FunctionType } from "../ast";
import simplify from "./simplify";

export function normalizeExpressions(node: Expression) {
    if (TypeExpression.is(node)) {
        node = node.value
    }
    if (Reference.is(node)) {
        return new BinaryExpression({
            location: node.location,
            left: new DotExpression({}),
            operator: "is",
            right: node
        })
    }
    return node
}

export function and(left: Expression | null, right: Expression | null): Expression | null {
    return combineTypeExpression(left, right, "&&")
}

export function or(left: Expression | null, right: Expression | null): Expression | null {
    return combineTypeExpression(left, right, "||")
}

export default function combineTypeExpression(left: Expression | null, right: Expression | null, operator: string): Expression | null {
    if (left == null) {
        return right
    }
    if (right == null) {
        return left
    }
    left = simplify(normalizeExpressions(left))
    right = simplify(normalizeExpressions(right))
    return simplify(new BinaryExpression({ left, operator, right }))
}
