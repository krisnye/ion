import { Expression, BinaryExpression, ExpressionStatement, UnaryExpression, Reference } from "../ast";
import toCodeString from "../toCodeString";
import { memoize } from "../common";

const negateOperators = {
    ">": "<=",
    "<": ">=",
    ">=": "<",
    "<=": ">",
    "==": "!=",
    "!=": "==",
}

// const primitiveTypes = {
//     "ion.String:String": true,
//     "ion.String:Number": true,
//     "ion.String:Boolean": true,
//     "ion.String:Array": true
//     "ion.String:Map": true,
//     "ion.String:Set": true,
//     "ion.String:Null": true,
//     "ion.String:Class": true,
//     "ion.String:Function": true,
// }

// // A | B & !A
// // what am I using this for anyways?
// function areTypesReferencesMutuallyExclusive(a: string, b: string): boolean {
//     return a !== b && (primitiveTypes[a] === true || primitiveTypes[b] === true)
// }

const negate = memoize(function (e: Expression): Expression {
    if (UnaryExpression.is(e)) {
        //  !!A => A
        if (e.operator === "not") {
            return e.argument
        }
    }
    if (BinaryExpression.is(e)) {
        let newOp = negateOperators[e.operator]
        if (newOp != null) {
            // !(A > B) => A <= B
            // !(A < B) => A >= B
            // !(A >= B) => A < B
            // !(A <= B) => A > B
            // !(A is B) => A isnt B
            // !(A isnt B) => A is B
            return e.patch({
                operator: newOp,
            })
        }
        if (e.operator === "&" || e.operator === "|") {
            //  !(A & B) => !A | !B
            //  !(A | B) => !A & !B
            return e.patch({
                left: negate(e.left),
                operator: e.operator === "&" ? "|" : "&",
                right: negate(e.right),
            })
        }
    }
    // !(A) => !A
    return new UnaryExpression({
        location: e.location,
        operator: "not",
        argument: e,
    })
}, true)

export default negate