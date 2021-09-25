import { BinaryExpression, Expression } from "../ast"

export default function combineExpressions(expressions: Array<Expression>, operator: string = "&"): Expression {
    let result: Expression | undefined
    for (let i = expressions.length - 1; i >= 0; i--) {
        let e = expressions[i]
        if (result == null) {
            result = e
        }
        else {
            //  we iterate in reverse and add new values to left
            //  so that the array will be left to right and symmetrical with toSubExpressions
            result = new BinaryExpression({ left: e, operator, right: result })
        }
    }
    return result!
}
