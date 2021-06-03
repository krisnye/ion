import { TypeExpression, Id, Expression, BinaryExpression, Reference, MemberExpression, DotExpression } from "../ast";
import { Any } from "../types";
import toCodeString from "../toCodeString";
import simplify from "./simplify";

export function combine(left: Expression | null, operator: string, right: Expression | null) {
    if (left == null) {
        return right
    }
    if (right == null) {
        return left
    }
    return new BinaryExpression({ left, operator, right })
}

export function getMemberExpression(e: Expression, member: Id | Expression | TypeExpression): Expression | null {
    if (BinaryExpression.is(e)) {
        if (e.operator === "is") {
            if (MemberExpression.is(e.left) && DotExpression.is(e.left.object)) {
                let dotProperty = e.left.property
                if (toCodeString(dotProperty) === toCodeString(member)) {
                    // return the same expression, but remove the member expression so
                    //  .foo is Bar => . is Bar
                    return e.patch({ left: e.left.object })
                }
            }
        }
        if (e.operator === "&" || e.operator === "|") {
            let left = getMemberExpression(e.left, member)
            let right = getMemberExpression(e.right, member)
            return combine(left, e.operator, right)
        }
    }

    return null
}

export default function getMemberTypeExpression(t: TypeExpression, member: Id | Expression | TypeExpression) {
    let e = t.value
    let value = getMemberExpression(e, member)
    if (value == null) {
        return null
    }
    value = Reference.is(value) ? value : new TypeExpression({ value })
    return simplify(value)
}
