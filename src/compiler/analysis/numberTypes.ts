import { BinaryExpression, Expression, NumberType, Type, Literal, UnionType, UnaryExpression, IntersectionType } from "../ast";
import toCodeString from "../toCodeString";
import combineExpressions from "./combineExpressions";
import evaluate from "./evaluate";
import EvaluateContext from "./EvaluateContext";

type NumberLiteral = Literal & { value: number }
type LiteralNumberType = NumberType & { min: NumberLiteral | null, max: NumberLiteral | null}

function isNumberLiteral(e: Expression): e is NumberLiteral {
    return Literal.is(e) && typeof e.value === "number"
}

export function isLiteralNumberType(type: Type): type is LiteralNumberType {
    return NumberType.is(type)
        && (type.min == null || isNumberLiteral(type.min))
        && (type.max == null || isNumberLiteral(type.max))
}

export function overlaps(max: Expression | null, min: Expression | null, exclusive: boolean): boolean | null {
    if (max != null && min != null) {
        if (toCodeString(max) === toCodeString(min)) {
            return !exclusive
        }
        if (isNumberLiteral(max) && isNumberLiteral(min)) {
            return exclusive ? max.value > min.value : max.value >= min.value
        }
    }
    return null
}

export function isNumberSubtype(a: NumberType, b: NumberType): boolean | null {
    if ((b.min == null || overlaps(a.min, b.min, a.minExclusive < b.minExclusive) === true) &&
        (b.max == null || overlaps(b.max, a.max, a.maxExclusive < b.maxExclusive) === true)) {
        return true
    }
    if (overlaps(a.max, b.min, b.minExclusive || a.maxExclusive) === false || overlaps(b.max, a.min, a.minExclusive || b.maxExclusive) === false) {
        return false
    }
    return null
}

const anyNumber = numberType(null)
const positive = numberType(0, null, true)
const positiveOrZero = numberType(0, null)
const zero = numberType(0, 0, false, false)
const negative = numberType(null, 0, true)
const negativeOrZero = numberType(null, 0)

/**
 * Returns null if the types are mutually incompatible.
 */
export function combineNumberTypes(types: Array<LiteralNumberType>): LiteralNumberType | null {
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
            if (max == null || type.max.value <= max.value) {
                max = type.max
                maxExclusive = type.maxExclusive
            }
        }
    }
    if (min && max && (min.value > max.value || min.value == max.value && (minExclusive || maxExclusive))) {
        return null
    }
    return new NumberType({ min, max, minExclusive, maxExclusive }) as LiteralNumberType
}

export function numberNotEqual(value: number | Expression) {
    let e = Expression.is(value) ? value : new Literal({ value })
    return new UnionType({
        types: [
            numberType(null, e, false, true),
            numberType(e, null, true, false),
        ]
    })
}

export function numberType(min: number | null, max?: number | null, minExclusive?: boolean, maxExclusive?: boolean): LiteralNumberType
export function numberType(min: Expression | null, max?: Expression | null, minExclusive?: boolean, maxExclusive?: boolean): NumberType
export function numberType(min: number | Expression | null, max: number | Expression | null = min, minExclusive = false, maxExclusive = minExclusive): NumberType {
    let minE = Expression.is(min) ? min : min == null ? null : new Literal({ value: min })
    let maxE = Expression.is(max) ? max : max == null ? null : new Literal({ value: max })
    return new NumberType({ min: minE, max: maxE, minExclusive: minE ? minExclusive : false, maxExclusive: maxE ? maxExclusive : false })
}

export function inferUnaryOperationType(a: Type, operator: string, c: EvaluateContext) {
    if (NumberType.is(a)) {
        switch (operator) {
            case "abs":
                //  abs [a0,a1]
                //  if a0 == null || a1 == null
                //      [0, null]
                //  if sign(a0) == sign(a1)
                //      [min(abs(a0),abs(a1)), max(abs(a0),abs(a1))]
                //  else
                //      [0, max(abs(a0),abs(a1))]
                {
                    if (a.min == null || a.max == null) {
                        // if either end is unbounded then we are any number >= 0
                        return numberType(0, null)
                    }
                    let sameSign = Literal.is(a.min) && Literal.is(a.max) && Math.sign(a.min.value as number) === Math.sign(a.max.value as number) 
                    let absMin = evaluate(new UnaryExpression({ operator, argument: a.min}), c)
                    let absMax = evaluate(new UnaryExpression({ operator, argument: a.max}), c)
                    let min = sameSign ? evaluate(new BinaryExpression({
                        left: absMin,
                        operator: "min",
                        right: absMax,
                    }), c) : new Literal({ value: 0 })
                    let max = evaluate(new BinaryExpression({
                        left: absMin,
                        operator: "max",
                        right: absMax,
                    }), c)
                    let minExclusive = sameSign ? a.minExclusive || a.maxExclusive : false
                    let maxExclusive = a.minExclusive || a.maxExclusive
                    return numberType(min, max, minExclusive, maxExclusive)
                }
            case "inv":
                //  inv [a0,a1]
                {
                    let sameSign = Literal.is(a.min) && Literal.is(a.max) && Math.sign(a.min.value as number) === Math.sign(a.max.value as number) 
                    let hasZero = !sameSign
                    let min = a.max ? evaluate(new UnaryExpression({ operator, argument: a.max }), c) : null
                    let max = a.min ? evaluate(new UnaryExpression({ operator, argument: a.min }), c) : null
                    let minExclusive = a.maxExclusive
                    let maxExclusive = a.minExclusive
                    if (hasZero) {
                        return new UnionType({
                            types: [
                                numberType(null, max, false, maxExclusive),
                                numberType(min, null, minExclusive, false),
                            ]
                        })
                    }
                    else {
                        return numberType(min, max, minExclusive, maxExclusive)
                    }
                }
        }
    }
    return a
}

export function inferBinaryOperationType(a: Type, b: Type, operator: string, c: EvaluateContext) {
    if (NumberType.is(a) && NumberType.is(b)) {
        switch (operator) {
            case "+":
                //  [a0,a1] + [b0, b1]
                //  -> [a0 + b0, a1 + b1]
            case "-":
                //  [a0,a1] - [b0, b1]
                //  -> [a0 - b0, a1 - b1]
            case "min":
                //  [a0,a1] min [b0, b1]
                //  -> [a0 min b0, a1 min b1]
            case "max":
                //  [a0,a1] max [b0, b1]
                //  -> [a0 max b0, a1 max b1]
                {
                    let min = a.min && b.min ? new BinaryExpression({ left: a.min, operator, right: b.min }) : null
                    let max = a.max && b.max ? new BinaryExpression({ left: a.max, operator, right: b.max }) : null
                    let minExclusive = a.minExclusive || b.minExclusive
                    let maxExclusive = a.maxExclusive || b.maxExclusive
                    return new NumberType({
                        min: min ? evaluate(min, c) : null,
                        max: max ? evaluate(max, c) : null,
                        minExclusive,
                        maxExclusive,
                    })
                }
            case "*":
                //  [a0,a1] * [b0,b1]
                //  -> [min(a0*b0,a0*b1,a1*b0,a1*b1), max((a0*b0,a0*b1,a1*b0,a1*b1))]
            case "**":
                //  [a0,a1] ** [b0,b1]
                //  -> [min(a0**b0,a0**b1,a1**b0,a1**b1), max((a0**b0,a0**b1,a1**b0,a1**b1))]
                    {
                    let a1b1 = a.min && b.min ? new BinaryExpression({ left: a.min, operator, right: b.min }) : null
                    let a1b2 = a.min && b.max ? new BinaryExpression({ left: a.min, operator, right: b.max }) : null
                    let a2b1 = a.max && b.min ? new BinaryExpression({ left: a.max, operator, right: b.min }) : null
                    let a2b2 = a.max && b.max ? new BinaryExpression({ left: a.max, operator, right: b.max }) : null
                    let exclusive = a.minExclusive || a.maxExclusive || b.minExclusive || b.maxExclusive
                    let expressions = [a1b1, a1b2, a2b1, a2b2].filter(Boolean) as Expression[]
                    let min = expressions.length > 0 ? combineExpressions(expressions, "min") : null
                    let max = expressions.length > 0 ? combineExpressions(expressions, "max") : null
                    return new NumberType({
                        min: min ? evaluate(min, c) : null,
                        max: max ? evaluate(max, c) : null,
                        minExclusive: exclusive,
                        maxExclusive: exclusive,
                    })
                }
            case "/":
                //  [a0,a1] / [b0,b1]
                //  -> [a0,a1] * inv([b0,b1])
                {
                    // get the inverse of the right hand operand
                    let invB = inferUnaryOperationType(b, "inv", c)
                    if (NumberType.is(invB)) {
                        return inferBinaryOperationType(a, invB, "*", c)
                    }
                    else {
                        // some number, let's not get too complicated.
                        return anyNumber
                    }
                }
            case "%":
                //  [a0,a1] % [b0,b1]
                {
                    if (isNumberSubtype(a, zero)) {
                        return zero
                    }
                    if (b.min == null || b.max == null) {
                        return anyNumber
                    }
                    let a_alwaysPositiveOrZero = isNumberSubtype(a, positiveOrZero)
                    let a_alwaysNegativeOrZero = !a_alwaysPositiveOrZero && isNumberSubtype(a, negativeOrZero)
                    // continue from here...........
                    let zeroLiteral = new Literal({ value: 0 })
                    let absMax = evaluate(new UnaryExpression({ operator: "abs", argument: b.max }), c)
                    if (a_alwaysPositiveOrZero) {
                        // if a > 0 then a % b is [0,b1]
                        return numberType(zeroLiteral, absMax, false, true)
                    }
                    let negativeAbsMax = evaluate(new UnaryExpression({ operator: "-", argument: absMax }), c)
                    if (a_alwaysNegativeOrZero) {
                        // if a < 0 then a % b is [-b1,0]
                        return numberType(negativeAbsMax, zeroLiteral, true, false)                        
                    }
                    // a % b is [-b1,b1]
                    return numberType(negativeAbsMax, absMax, true, true)
                }
        }
    }
    return a
}
