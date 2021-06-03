import { Expression, Reference, BinaryExpression, DotExpression, TypeExpression } from "../ast";
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

export default function combineTypeExpression(left: Expression, right: Expression): Expression | null {
    left = simplify(normalizeExpressions(left))
    right = simplify(normalizeExpressions(right))
    if (left == null) {
        return right
    }
    if (right == null) {
        return left
    }
    return simplify(new BinaryExpression({ left, operator: "&", right }))
}