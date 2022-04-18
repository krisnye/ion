import { AnyType } from "../ast/AnyType";
import { Call } from "../ast/Call";
import { Expression } from "../ast/Expression";
import { Function } from "../ast/Function";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { NumberLiteral } from "../ast/NumberLiteral";
import { NumberType } from "../ast/NumberType";
import { Reference } from "../ast/Reference";
import { Type } from "../ast/Type";
import { SourceLocation } from "../SourceLocation";

type TypeFunction = (node: Function, types: Type[]) => Type;

function BinaryOperation(location: SourceLocation, operator: string, left: Expression, right: Expression) {
    if (left instanceof NumberLiteral && right instanceof NumberLiteral) {
        let value = eval(`${left.value}${operator}${right.value}`) as number;
        if (left instanceof IntegerLiteral) {
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

export const nativeTypeFunctions: { [key: string]: TypeFunction | undefined } = {
    "+((Integer),(Integer))": (node, types: Type[]) => {
        console.log("------- " + types.join(","));
        const a = types[0] as NumberType;
        const b = types[1] as NumberType;
        const { location } = node;
        const operator = `+`;
        let min = a.min && b.min ? BinaryOperation(location, operator, a.min, b.min) : undefined;
        let max = a.max && b.max ? BinaryOperation(location, operator, a.max, b.max) : undefined;
        let minExclusive = a.minExclusive || b.minExclusive;
        let maxExclusive = a.maxExclusive || b.maxExclusive;
        return new NumberType({ location, min, max, minExclusive, maxExclusive });
    }
};
