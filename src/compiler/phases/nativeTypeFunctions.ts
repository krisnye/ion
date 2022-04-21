import { Call } from "../ast/Call";
import { Expression } from "../ast/Expression";
import { Function } from "../ast/Function";
import { NumberLiteral } from "../ast/NumberLiteral";
import { NumberType } from "../ast/NumberType";
import { Reference } from "../ast/Reference";
import { Type } from "../ast/Type";
import { UnionType } from "../ast/UnionType";
import { isValidId } from "../common";
import { Node } from "../Node";
import { SourceLocation } from "../SourceLocation";

type TypeFunction = (node: Function, types: Type[]) => Type;

function BinaryOperation(location: SourceLocation, operator: string, left: Expression, right: Expression) {
    if (left instanceof NumberLiteral && right instanceof NumberLiteral) {
        let code = isValidId(operator[0])
            ? `Math.${operator}(${left.value} , ${right.value})`
            : `((${left.value}) ${operator} (${right.value}))`;
        let value = eval(code) as number;
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

function calculateAbsType(node: Node, a: NumberType) {
    const { location } = node;
    const { integer } = a;
    if (a.min == null || a.max == null) {
        // if either end is unbounded then we are any number >= 0
        return new NumberType({ location, integer });
    }
    let sameSign = a.min instanceof NumberLiteral && a.max instanceof NumberLiteral && Math.sign(a.min.value as number) === Math.sign(a.max.value as number);
    let absMin = UnaryOperation(location, "abs", a.min);
    let absMax = UnaryOperation(location, "abs", a.max);
    let min = sameSign ? BinaryOperation(location, "min", absMin, absMax) : new NumberLiteral({ location, integer: a.integer, value: 0, resolved: true });
    let max = BinaryOperation(location, "max", absMin, absMax);
    let minExclusive = sameSign ? a.minExclusive || a.maxExclusive : false;
    let maxExclusive = a.minExclusive || a.maxExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, integer });
}

function calculateAdditiveType(node: Node, [a, b]: NumberType[], operator: "+" | "min" | "max") {
    const { location } = node;
    let min = a.min && b.min ? BinaryOperation(location, operator, a.min, b.min) : undefined;
    let max = a.max && b.max ? BinaryOperation(location, operator, a.max, b.max) : undefined;
    let minExclusive = a.minExclusive || b.minExclusive;
    let maxExclusive = a.maxExclusive || b.maxExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, integer: a.integer });
}

function calculateInverse(node: Node, a: NumberType): NumberType | UnionType {
    const { location } = node;
    let sameSign = a.min instanceof NumberLiteral && a.max instanceof NumberLiteral && Math.sign(a.min.value as number) === Math.sign(a.max.value as number);
    let hasZero = !sameSign;
    let one = new NumberLiteral({ location, value: 1, resolved: true });
    let min = a.max ? BinaryOperation(location, "/", one, a.max) : undefined;
    let max = a.min ? BinaryOperation(location, "/", one, a.min) : undefined;
    let minExclusive = a.maxExclusive;
    let maxExclusive = a.minExclusive;
    if (hasZero) {
        return UnionType.join(
            new NumberType({ location, max, minExclusive: false, maxExclusive, integer: a.integer }),
            new NumberType({ location, min, minExclusive, maxExclusive: false, integer: a.integer }),
        ) as UnionType;
    }
    else {
        return new NumberType({ location, min, max, minExclusive, maxExclusive, integer: a.integer });
    }
}

function maybeToInteger(type: NumberType, integer?: boolean) {
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
        return maybeToInteger(calculateMultiplicativeType(node, [a, inverseB], "*"), b.integer);
    }
    return UnionType.join(
        maybeToInteger(calculateMultiplicativeType(node, [a, inverseB.left as NumberType], "*"), b.integer),
        maybeToInteger(calculateMultiplicativeType(node, [a, inverseB.right as NumberType], "*"), b.integer),
    )!
}

function calculateNegation(node: Node, a: NumberType) {
    const { location } = node;
    const { integer } = a;
    const zero = new NumberLiteral({ location, integer, value: 0, resolved: true });
    return calculateSubtractiveType(node, [new NumberType({ location, integer, min: zero, max: zero }), a], "-");
}

function calculateSubtractiveType(node: Node, [a, b]: NumberType[], operator: "-") {
    const { location } = node;
    let min = a.min && b.max ? BinaryOperation(location, operator, a.min, b.max) : undefined;
    let max = a.max && b.min ? BinaryOperation(location, operator, a.max, b.min) : undefined;
    let minExclusive = a.minExclusive || b.minExclusive;
    let maxExclusive = a.maxExclusive || b.maxExclusive;
    return new NumberType({ location, min, max, minExclusive, maxExclusive, integer: a.integer });
}

function calculateMultiplicativeType(node: Node, [a, b]: NumberType[], operator: "*" | "**") {
    const { location } = node;
    let a1b1 = a.min && b.min ? BinaryOperation(location, operator, a.min, b.min) : undefined;
    let a1b2 = a.min && b.max ? BinaryOperation(location, operator, a.min, b.max) : undefined;
    let a2b1 = a.max && b.min ? BinaryOperation(location, operator, a.max, b.min) : undefined;
    let a2b2 = a.max && b.max ? BinaryOperation(location, operator, a.max, b.max) : undefined;
    let a1b1value = a1b1 instanceof NumberLiteral ? a1b1.value : undefined;
    let a1b2value = a1b2 instanceof NumberLiteral ? a1b2.value : undefined;
    let a2b1value = a2b1 instanceof NumberLiteral ? a2b1.value : undefined;
    let a2b2value = a2b2 instanceof NumberLiteral ? a2b2.value : undefined;
    let values = [a1b1value, a1b2value, a2b1value, a2b2value].filter(value => value != null) as Array<number>;
    let min = values.length > 0 ? Math.min(...values) : undefined;
    let max = values.length > 0 ? Math.max(...values) : undefined;
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
        min: min != null ? new NumberLiteral({ location, integer: a.integer, value: min, resolved: true  }) : undefined,
        max: max != null ? new NumberLiteral({ location, integer: a.integer, value: max, resolved: true  }) : undefined,
        minExclusive,
        maxExclusive,
        integer: a.integer,
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
    "*((Integer),(Integer))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "*"),
    "*((Float),(Float))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "*"),
    //  [a0,a1] ** [b0,b1]  ->  [min(a0**b0,a0**b1,a1**b0,a1**b1), max((a0**b0,a0**b1,a1**b0,a1**b1))]
    "**((Integer),(Integer))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "**"),
    "**((Float),(Float))": (node, types) => calculateMultiplicativeType(node, types as NumberType[], "**"),

    "/((Integer),(< 0) | (> 0))": (node, types) => {
        console.log("Integer Division: " + types.join(", "));
        debugger;
        return calculateDivision(node, types as NumberType[])
    },
    "/((Float),(Float))": (node, types) => {
        console.log("Float Division" + types.join(", "));
        return calculateDivision(node, types as NumberType[]);
    },

    "-((Float))": (node, types) => calculateNegation(node, types[0] as NumberType),
    "-((Integer))": (node, types) => calculateNegation(node, types[0] as NumberType),
    "abs((Float))": (node, types) => calculateAbsType(node, types[0] as NumberType),
    "abs((Integer))": (node, types) => calculateAbsType(node, types[0] as NumberType),
};
