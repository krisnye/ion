import { memoize } from "../common"
import { Expression, BinaryExpression, Literal } from "../ast"
import toCodeString from "../toCodeString"

const reassociateLeft = {
    "|": true,
    "&": true,
    "+": true,
    "*": true,
}

const reflectOperators = {
    "<": ">",
    ">": "<",
    ">=": "<=",
    "<=": ">=",
    "==": "==",
    "!=": "!=",
}

function shouldSwapOrder(left: Expression, right: Expression) {
    if (Literal.is(left) && !Literal.is(right)) {
        return true
    }
    return toCodeString(left).localeCompare(toCodeString(right)) > 0
}

const normalize = memoize(function(e: Expression): Expression {
    if (BinaryExpression.is(e)) {
        let left = normalize(e.left)
        let right = normalize(e.right)
        let operator = e.operator
        if (reassociateLeft[e.operator]) {
            if (BinaryExpression.is(right) && right.operator === e.operator) {
                left = new BinaryExpression({
                    location: right.location,
                    left: left,
                    operator: e.operator,
                    right: right.left
                }),
                right = right.right
            }
        }
        // literal values should always be on the right.
        let canSwap = reflectOperators[operator] != null
        if (canSwap && shouldSwapOrder(left, right)) {
            [left, right] = [right, left]
            operator = reflectOperators[operator]
        }
        if (left !== e.left || right !== e.right || operator !== e.operator) {
            e = e.patch({ left, operator, right })
        }
    }
    return e
}, true)

export default normalize
