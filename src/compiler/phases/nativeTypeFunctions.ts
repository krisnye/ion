import { isSubtype } from "../analysis/isSubtype";
import { Call } from "../ast/Call";
import { Expression } from "../ast/Expression";
import { Function } from "../ast/Function";
import { NumberLiteral } from "../ast/NumberLiteral";
import { NumberType } from "../ast/NumberType";
import { Reference } from "../ast/Reference";
import { Type } from "../ast/Type";
import { UnionType } from "../ast/UnionType";
import { isValidId } from "../common";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { SourceLocation } from "../SourceLocation";

export type TypeFunction = (node: Function, types: Type[], c: EvaluationContext) => Type;

function BinaryExpression(location: SourceLocation, operator: string, left: Expression, right: Expression): Expression | undefined {
    if (left instanceof NumberLiteral && right instanceof NumberLiteral) {
        let code = isValidId(operator[0])
            ? `Math.${operator}(${left.value} , ${right.value})`
            : `((${left.value}) ${operator} (${right.value}))`;
        let value = eval(code) as number;
        if (isNaN(value)) {
            return undefined;
        }
        // console.log({ operator, left: left.toString(), right: right.toString(), code, value });
        if (left.integer) {
            value = Math.trunc(value);
        }
        return left.patch({ location, value });
    }
    return new Call({
        location,
        callee: new Reference({ location, name: operator, resolved: true }),
        nodes: [left, right]
    })
}

function UnaryOperation(location: SourceLocation, operator: string, right: Expression) {
    if (right instanceof NumberLiteral) {
        let code = isValidId(operator[0])
            ? `Math.${operator}(${right.value})`
            : `(${operator} (${right.value}))`;
        let value = eval(code) as number;
        if (right.integer) {
            value = Math.trunc(value);
        }
        return right.patch({ location, value });
    }
    return new Call({
        location,
        callee: new Reference({ location, name: operator, resolved: true }),
        nodes: [right]
    })
}

function sign(value: number | undefined, exclusive: boolean, undefinedDefault: 1 | 0 | -1, zeroDefault = -undefinedDefault) {
    if (value == null) {
        return undefinedDefault;
    }
    let sign = Math.sign(value);
    if (sign === 0 && exclusive) {
        return zeroDefault;
    }
    return sign;
}

function calculateAbsType(node: Node, a: NumberType) {
    const { location } = node;
    const { integer } = a;
    let negMax = NumberLiteral.fromConstant(Number.NEGATIVE_INFINITY, location, integer);
    let posMax = NumberLiteral.fromConstant(Number.POSITIVE_INFINITY, location, integer);
    let aMin = a.min ?? negMax;
    let aMax = a.max ?? posMax;
    // if (a.min == null || a.max == null) {
    //     // if either end is unbounded then we are any number >= 0
    //     return new NumberType({ location, integer });
    // }
    let sameSign = aMin instanceof NumberLiteral && aMax instanceof NumberLiteral && sign(aMin.value, a.minExclusive, -1) === sign(aMax.value, a.maxExclusive, +1);
    let absMin = UnaryOperation(location, "abs", aMin);
    let absMax = UnaryOperation(location, "abs", aMax);
    let min = sameSign ? BinaryExpression(location, "min", absMin, absMax) : new NumberLiteral({ location, integer: a.integer, value: 0, resolved: true });
    let max = BinaryExpression(location, "max", absMin, absMax);
    let minExclusive = sameSign ? a.minExclusive || a.maxExclusive : false;
    let maxExclusive = a.minExclusive || a.maxExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, step: integer });
}

function calculateAdditiveType(node: Node, [a, b]: NumberType[], operator: "+" | "min" | "max") {
    const { location } = node;
    let min = a.min && b.min ? BinaryExpression(location, operator, a.min, b.min) : undefined;
    let max = a.max && b.max ? BinaryExpression(location, operator, a.max, b.max) : undefined;
    if (operator === "min") {
        max ??= a.max ?? b.max;
    }
    else if (operator === "max") {
        min ??= a.min ?? b.min;
    }
    let minExclusive = a.minExclusive || b.minExclusive;
    let maxExclusive = a.maxExclusive || b.maxExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, step: a.step });
}

function calculateInverse(node: Node, a: NumberType): NumberType | UnionType {
    const { location } = node;
    let sameSign = a.min instanceof NumberLiteral && a.max instanceof NumberLiteral && Math.sign(a.min.value as number) === Math.sign(a.max.value as number);
    let hasZero = !sameSign;
    let one = new NumberLiteral({ location, value: 1, resolved: true });
    let min = a.max ? BinaryExpression(location, "/", one, a.max) : undefined;
    let max = a.min ? BinaryExpression(location, "/", one, a.min) : undefined;
    let minExclusive = a.maxExclusive;
    let maxExclusive = a.minExclusive;
    if (hasZero) {
        return UnionType.join(
            new NumberType({ location, max, minExclusive: false, maxExclusive, step: a.step }),
            new NumberType({ location, min, minExclusive, maxExclusive: false, step: a.step }),
        ) as UnionType;
    }
    else {
        return new NumberType({ location, min, max, minExclusive, maxExclusive, step: a.step });
    }
}

function maybeToInteger(type: NumberType, integer?: boolean | null) {
    if (integer) {
        if (type.min instanceof NumberLiteral) {
            type = type.patch({ min: type.min.patch({ value: Math.trunc(type.min.value), integer: true }) });
        }
        if (type.max instanceof NumberLiteral) {
            type = type.patch({ max: type.max.patch({ value: Math.trunc(type.max.value), integer: true }) });
        }
    }
    return type;
}

function calculateDivision(node: Node, [a, b]: NumberType[]) {
    let inverseB = calculateInverse(node, b);
    if (inverseB instanceof NumberType) {
        return maybeToInteger(calculateMultiplicativeType(node, [a, inverseB], "*", b.integer), b.integer);
    }
    return UnionType.join(
        maybeToInteger(calculateMultiplicativeType(node, [a, inverseB.left as NumberType], "*", b.integer), b.integer),
        maybeToInteger(calculateMultiplicativeType(node, [a, inverseB.right as NumberType], "*", b.integer), b.integer),
    )!
}

function calculateRemainder(node: Node, [a, b]: NumberType[], c: EvaluationContext) {
    const { location } = node;
    const { integer } = a;
    if (a.isConstant(0)) {
        return NumberType.fromConstant(0, location, integer);
    }

    if (b.min == null || b.max == null) {
        return new NumberType({ location, step: integer });
    }

    const positiveOrZero = new NumberType({ location, min: NumberLiteral.fromConstant(0, location, integer) })
    const negativeOrZero = new NumberType({ location, max: NumberLiteral.fromConstant(0, location, integer) })

    const a_alwaysPositiveOrZero = isSubtype(a, positiveOrZero, c);
    const a_alwaysNegativeOrZero = !a_alwaysPositiveOrZero && isSubtype(a, negativeOrZero, c);

    let zeroLiteral = new NumberLiteral({ value: 0, location, integer });
    let absMax = UnaryOperation(location, "abs", b.max);
    if (a_alwaysPositiveOrZero) {
        // if a > 0 then a % b is [0, < b1]
        return new NumberType({ location, min: zeroLiteral, max: absMax, maxExclusive: true, step: integer });
    }
    let negativeAbsMax = UnaryOperation(location, "-", absMax);
    if (a_alwaysNegativeOrZero) {
        // if a < 0 then a % b is [-b1,0]
        return new NumberType({ location, min: negativeAbsMax, max: zeroLiteral, step: integer });
    }
    // a % b is [-b1,b1]
    return new NumberType({ location, min: negativeAbsMax, max: absMax, minExclusive: true, maxExclusive: true, step: integer });
}

function calculateMonotonic(node: Node, a: NumberType, operator: string) {
    const { location } = node;
    let min = a.min ? UnaryOperation(location, operator, a.min) : undefined;
    let max = a.max ? UnaryOperation(location, operator, a.max) : undefined;
    return a.patch({ min, max });
}

function calculateNegation(node: Node, a: NumberType) {
    const { location } = node;
    const { integer } = a;
    const zero = new NumberLiteral({ location, integer, value: 0, resolved: true });
    return calculateSubtractiveType(node, [new NumberType({ location, step: integer, min: zero, max: zero }), a], "-");
}

function calculateSubtractiveType(node: Node, [a, b]: NumberType[], operator: "-") {
    const { location } = node;
    let min = a.min && b.max ? BinaryExpression(location, operator, a.min, b.max) : undefined;
    let max = a.max && b.min ? BinaryExpression(location, operator, a.max, b.min) : undefined;
    let minExclusive = a.minExclusive || b.maxExclusive;
    let maxExclusive = a.maxExclusive || b.minExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, step: a.step });
}

function calculateMultiplicativeType(node: Node, [a, b]: NumberType[], operator: "*" | "**", integer: boolean | null) {
    const { location } = node;
    let negMax = NumberLiteral.fromConstant(Number.NEGATIVE_INFINITY, location, integer);
    let posMax = NumberLiteral.fromConstant(Number.POSITIVE_INFINITY, location, integer);
    let aMin = a.min ?? negMax;
    let aMax = a.max ?? posMax;
    let bMin = b.min ?? negMax;
    let bMax = b.max ?? posMax;
    let a1b1 = BinaryExpression(location, operator, aMin, bMin);
    let a1b2 = BinaryExpression(location, operator, aMin, bMax);
    let a2b1 = BinaryExpression(location, operator, aMax, bMin);
    let a2b2 = BinaryExpression(location, operator, aMax, bMax);
    let a1b1value = a1b1 instanceof NumberLiteral ? a1b1.value : undefined;
    let a1b2value = a1b2 instanceof NumberLiteral ? a1b2.value : undefined;
    let a2b1value = a2b1 instanceof NumberLiteral ? a2b1.value : undefined;
    let a2b2value = a2b2 instanceof NumberLiteral ? a2b2.value : undefined;
    let values = [a1b1value, a1b2value, a2b1value, a2b2value].filter(value => value != null) as Array<number>;
    let min = Math.min(...values);
    let max = Math.max(...values);
    let getExclusive = (value) => {
        switch (value) {
            case a1b1value: return a.minExclusive || b.minExclusive;
            case a1b2value: return a.minExclusive || b.maxExclusive;
            case a2b1value: return a.maxExclusive || b.minExclusive;
            case a2b2value: return a.maxExclusive || b.maxExclusive;
        }
    }
    let minExclusive = getExclusive(min);
    let maxExclusive = getExclusive(max);
    return new NumberType({
        location,
        min: min != Number.NEGATIVE_INFINITY ? new NumberLiteral({ location, integer: a.integer, value: min, resolved: true  }) : undefined,
        max: max != Number.POSITIVE_INFINITY ? new NumberLiteral({ location, integer: a.integer, value: max, resolved: true  }) : undefined,
        minExclusive,
        maxExclusive,
        step: a.step,
    });
}

//  Ideally these would be defined
export const nativeTypeFunctions: { [key: string]: TypeFunction | undefined } = {
    //  [a0,a1] + [b0, b1]  ->  [a0 + b0, a1 + b1]
    "+((Integer),(Integer))": (node, types) => calculateAdditiveType(node, types as NumberType[], "+"),
    "+((Float),(Float))": (node, types) => calculateAdditiveType(node, types as NumberType[], "+"),
    //  [a0,a1] - [b0, b1]  ->  [a0 - b0, a1 - b1]
    "-((Integer),(Integer))": (node, types) => calculateSubtractiveType(node, types as NumberType[], "-"),
    "-((Float),(Float))": (node, types) => calculateSubtractiveType(node, types as NumberType[], "-"),
    //  [a0,a1] min [b0, b1]  ->  [a0 min b0, a1 min b1]
    "min((Integer),(Integer))": (node, types) => calculateAdditiveType(node, types as NumberType[], "min"),
    "min((Float),(Float))": (node, types) => calculateAdditiveType(node, types as NumberType[], "min"),
    //  [a0,a1] max [b0, b1]  ->  [a0 max b0, a1 max b1]
    "max((Integer),(Integer))": (node, types) => calculateAdditiveType(node, types as NumberType[], "max"),
    "max((Float),(Float))": (node, types) => calculateAdditiveType(node, types as NumberType[], "max"),
    //  [a0,a1] * [b0,b1]  ->  [min(a0*b0,a0*b1,a1*b0,a1*b1), max((a0*b0,a0*b1,a1*b0,a1*b1))]
    "*((Integer),(Integer))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "*", true),
    "*((Float),(Float))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "*", false),
    //  [a0,a1] ** [b0,b1]  ->  [min(a0**b0,a0**b1,a1**b0,a1**b1), max((a0**b0,a0**b1,a1**b0,a1**b1))]
    "**((Integer),(Integer))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "**", true),
    "**((Float),(Float))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "**", false),

    "/((Integer),(< 0) | (> 0))": (node, types) => { return calculateDivision(node, types as NumberType[]) },
    "/((Float),(Float))": (node, types) => { return calculateDivision(node, types as NumberType[]); },

    "%((Integer),(< 0) | (> 0))": (node, types, c) => { return calculateRemainder(node, types as NumberType[], c) },
    "%((Float),(Float))": (node, types, c) => { return calculateRemainder(node, types as NumberType[], c); },

    "sqrt((>= 0.0))": (node, types, c) => { return calculateMonotonic(node, types[0] as NumberType, "sqrt") },

    "-((Float))": (node, types) => calculateNegation(node, types[0] as NumberType),
    "-((Integer))": (node, types) => calculateNegation(node, types[0] as NumberType),
    "abs((Float))": (node, types) => calculateAbsType(node, types[0] as NumberType),
    "abs((Integer))": (node, types) => calculateAbsType(node, types[0] as NumberType),
};
