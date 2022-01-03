import { memoize } from "../common"
import { Expression, BinaryExpression, Literal, DotExpression, NumberType, Reference, IntersectionType, UnionType, ObjectType } from "../ast"
import * as ast from "../ast"
import toCodeString from "../toCodeString"
import * as types from "../types"
import { numberType } from "./numberTypes"

const reassociateLeft = {
    "|": true,
    "&": true,
    "||": true,
    "&&": true,
    "+": true,
    "*": true,
}

const relationOperators = {
    "<": ">",
    ">": "<",
    ">=": "<=",
    "<=": ">=",
    "==": "==",
}

export const reflectOperators = {
    ...relationOperators,
    "!=": "!=",
}

export const operatorToNumberTypes = {
    ">":  (value: Expression) => [numberType(value, null, true)],
    "<":  (value: Expression) => [numberType(null, value, true)],
    ">=": (value: Expression) => [numberType(value, null, false)],
    "<=": (value: Expression) => [numberType(null, value, false)],
    "==": (value: Expression) => [numberType(value, value, false)],
    "!=": (value: Expression) => [numberType(null, value, true), numberType(value, null, true)],
}

function shouldSwapOrder(left: Expression, right: Expression) {
    if (Literal.is(left) && !Literal.is(right)) {
        return true
    }
    return toCodeString(left).localeCompare(toCodeString(right)) > 0
}

const sortType: {
    [P in keyof typeof ast]?: number
} = {
    ReferenceType: 0,
    ObjectType: 1,
}

const normalize = memoize(function(e: Expression): Expression {
    if (UnionType.is(e) || IntersectionType.is(e)) {
        return e.patch({
            types: e.types.map(normalize).sort((a, b) => {
                return (sortType[a.constructor.name] || 0) - (sortType[b.constructor.name] || 0)
                    || toCodeString(a).localeCompare(toCodeString(b))
            })
        })
    }
    if (ObjectType.is(e)) {
        //  we DO NOT sort ObjectType items as the order matters for analysis
        return e.patch({
            properties: e.properties.map(normalize)
        })
    }
    if (BinaryExpression.is(e)) {
        let left = normalize(e.left)
        let right = normalize(e.right)
        let operator = e.operator
        // if (DotExpression.is(left) && relationOperators[e.operator]) {
        //     //  relation implies number on right, even if it's not a literal.
        //     if (operator.startsWith("<")) {
        //         return new NumberType({ ...e, max: right, maxExclusive: !operator.endsWith("=") })
        //     }
        //     if (operator.startsWith(">")) {
        //         return new NumberType({ ...e, min: right, minExclusive: !operator.endsWith("=") })
        //     }
        //     // must be ==
        //     return new NumberType({ ...e, min: right, max: right })
        // }
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
