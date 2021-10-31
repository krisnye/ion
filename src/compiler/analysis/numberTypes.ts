import { BinaryExpression, DotExpression, Expression, NumberType, Reference, TypeExpression, Type, Literal, Property } from "../ast";
import * as ops from "../ops";
import toCodeString from "../toCodeString";
import * as types from "../types";
import combineExpressions from "./combineExpressions";
import evaluate from "./evaluate";
import EvaluateContext from "./EvaluateContext";
import splitExpressions from "./splitExpressions";

// function toNumberType(type: Expression): NumberType {
//     let precision = 2
//     let min: Type | null = null
//     let max: Type | null = null
//     let minExclusive = false
//     let maxExclusive = false
//     let orOps = [...splitExpressions(TypeExpression.is(type) ? type.value : type, ops.or)]
//     if (orOps.length > 1) {
//         throw new Error(`Numeric | types not implemented yet`)
//     }
//     function getValuesFromConstraint(e: Expression) {
//         if (Reference.is(e)) {
//             if (e.name === types.Number.name) {
//                 precision = 2
//             }
//             else if (e.name === types.Integer.name) {
//                 precision = 0
//             }
//         }
//         else if (BinaryExpression.is(e)) {
//             if (DotExpression.is(e.left)) {
//                 if (!Type.is(e.right)) {
//                     throw new Error(`Expected right side of op to be a type: ${toCodeString(e)}`)
//                 }
//                 if (e.operator === ops.is) {
//                     getValuesFromConstraint(e.right)
//                 }
//                 else if (e.operator === ops.greaterThan) {
//                     min = e.right
//                     minExclusive = true
//                 }
//                 else if (e.operator === ops.greaterThanOrEqual) {
//                     min = e.right
//                 }
//                 else if (e.operator === ops.lessThan) {
//                     max = e.right
//                     maxExclusive = true
//                 }
//                 else if (e.operator === ops.lessThanOrEqual) {
//                     max = e.right
//                 }
//             }
//         }
//     }
//     for (let e of splitExpressions(orOps[0], ops.and)) {
//         getValuesFromConstraint(e)
//     }
//     return new NumberType({
//         precision,
//         min: Type.is(min) ? min as any : new Literal({ location: type.location, value: min, integer: precision === 0 }),
//         max: Type.is(max) ? max as any  : new Literal({ location: type.location, value: max, integer: precision === 0 }),
//         minExclusive,
//         maxExclusive
//     })
// }

// function toTypeExpression(type: NumberType) {
//     if (!type.minExclusive && !type.maxExclusive) {
//         if (type.min == null && type.max == null) {
//             return type.precision === 0 ? types.Integer : types.Number
//         }
//     }
//     let constraints = new Array<Expression>()
//     constraints.push(
//         new BinaryExpression({
//             location: type.location,
//             left: new DotExpression({}),
//             operator: ops.is,
//             right: type.precision === 0 ? types.Integer : types.Number
//         })
//     )
//     if (type.min != null) {
//         // add minimum constraint
//         constraints.push(
//             new BinaryExpression({
//                 location: type.location,
//                 left: new DotExpression({}),
//                 operator: type.minExclusive ? ops.greaterThan : ops.greaterThanOrEqual,
//                 right: type.min
//             })
//         )
//     }
//     if (type.max != null) {
//         // add maximum constraint
//         constraints.push(
//             new BinaryExpression({
//                 location: type.location,
//                 left: new DotExpression({}),
//                 operator: type.maxExclusive ? ops.lessThan : ops.lessThanOrEqual,
//                 right: type.max
//             })
//         )
//     }
//     return new TypeExpression({ value: combineExpressions(constraints, ops.and) })
// }

type NumberLiteral = Literal & { value: number }
type LiteralNumberType = NumberType & { min: NumberLiteral | null, max: NumberLiteral | null}

export function isLiteralNumberType(type: Type): type is LiteralNumberType {
    return NumberType.is(type)
        && (type.min == null || Literal.is(type.min) && typeof type.min.value === "number")
        && (type.max == null || Literal.is(type.max) && typeof type.max.value === "number")
}

export function combineNumberTypes(types: Array<LiteralNumberType>) {
    let min: NumberLiteral | null = null
    let max: NumberLiteral | null = null
    let minExclusive = false
    let maxExclusive = false
    for (let type of types) {
        if (type.min != null) {
            if (min == null || type.min.value >= min.value) {
                min = type.min
                minExclusive = type.minExclusive
            }
        }
        if (type.max != null) {
            if (max == null || type.max.value >= max.value) {
                max = type.max
                maxExclusive = type.maxExclusive
            }
        }
    }
    return new NumberType({ min, max, minExclusive, maxExclusive })
}

export function identityNumberType(v: number) {
    let value = new Literal({ value: v })
    return new NumberType({ min: value, max: value})
}

export function inferOperationType(a: Type, b: Type, operator: string, c: EvaluateContext) {
    if (NumberType.is(a) && NumberType.is(b)) {
        switch(operator) {
            case "+":
            case "-":
                let min = a.min && b.min ? new BinaryExpression({ left: a.min, operator, right: b.min }) : null
                let max = a.max && b.max ? new BinaryExpression({ left: a.max, operator, right: b.max }) : null
                let minExclusive = a.minExclusive || b.minExclusive
                let maxExclusive = a.maxExclusive || b.maxExclusive
                // console.log({ a, b, min, max, minExclusive, maxExclusive })
                return new NumberType({
                    min: min ? evaluate(min, c) : null,
                    max: max ? evaluate(max, c) : null,
                    minExclusive,
                    maxExclusive
                })
        }
    }
    // let aType = toNumberType(a)
    // let bType = toNumberType(b)
    if (operator === ops.addition) {
        // just do one FFS or do we need more analysis?
        // add this shit.
    }
    // next, after Number type then combine them
    return a
}
