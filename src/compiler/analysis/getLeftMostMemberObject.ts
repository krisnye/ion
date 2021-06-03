import { Expression, MemberExpression } from "../ast"

export default function getLeftMostMemberObject(m: MemberExpression): Expression {
    while (MemberExpression.is(m.object)) {
        m = m.object
    }
    return m.object
}