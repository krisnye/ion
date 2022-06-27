import { TypeOperators } from "../analysis/TypeOperators";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { SourceLocation } from "../SourceLocation";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { NumberLiteral } from "./NumberLiteral";
import { Reference } from "./Reference";
import { BasicType, Type } from "./Type";
import { leastCommonMultiple } from "../analysis/math";

type LiteralNumberType = NumberType & { min: NumberLiteral | null, max: NumberLiteral | null}

export function isLiteralNumberType(type: Type): type is LiteralNumberType {
    return type instanceof NumberType
        && (type.min == null || type.min instanceof NumberLiteral)
        && (type.max == null || type.max instanceof NumberLiteral)
}

export function overlaps(max: Node | undefined, min: Node | undefined, exclusive: boolean): boolean | null {
    if (max != null && min != null) {
        if (max.toString() === min.toString()) {
            return !exclusive
        }
        if (max instanceof NumberLiteral && min instanceof NumberLiteral) {
            return exclusive ? max.value > min.value : max.value >= min.value
        }
    }
    return null
}

export interface NumberTypeProps extends BaseTypeProps {
    min?: Node;
    max?: Node;
    minExclusive?: boolean;
    maxExclusive?: boolean;
    step?: boolean | number | null;
    offset?: number;
}

export class NumberType extends BaseType {

    min?: Expression;
    max?: Expression;
    minExclusive!: boolean;
    maxExclusive!: boolean;
    step!: number;

    constructor(props: NumberTypeProps) {
        if (props.min instanceof NumberLiteral) {
            props.step = props.min.integer;
        }
        else if (props.max instanceof NumberLiteral) {
            props.step = props.max.integer;
        }
        props.step = Boolean(props.step);
        if (props.min instanceof NumberLiteral && props.min.value === Number.POSITIVE_INFINITY) {
            props.min = undefined;
        }
        if (props.max instanceof NumberLiteral && props.max.value === Number.NEGATIVE_INFINITY) {
            props.max = undefined;
        }
        if (props.min instanceof NumberLiteral) {
            props.min = props.min.patch({ resolved: true });
        }
        if (props.max instanceof NumberLiteral) {
            props.max = props.max.patch({ resolved: true });
        }
        super({ minExclusive: false, maxExclusive: false, ...props });
    }

    getBasicTypes() {
        return BasicType.Number;
    }

    get integer() {
        return this.step > 0;
    }

    static fromConstant(value: number, location: SourceLocation, integer: boolean | null | undefined = value === Math.trunc(value)) {
        let literalValue = NumberLiteral.fromConstant(value, location, integer).patch({ resolved: true });
        return new NumberType({ location, min: literalValue, max: literalValue, step: integer });
    }

    isConstant(value: number) {
        return this.min instanceof NumberLiteral
            && this.min.value === value
            && this.max instanceof NumberLiteral
            && this.max.value === value;
    }

    patch(props: Partial<NumberTypeProps>) {
        return super.patch(props);
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        const { location } = this;
        return BinaryExpression.join(
            TypeOperators.and,
            new BinaryExpression({
                location,
                left: dot,
                operator: TypeOperators.is,
                right: new Reference({ location, name: this.step ? coreTypes.Integer : coreTypes.Number})
            }),
            this.min == null
                ? null
                : new BinaryExpression({
                    location,
                    left: dot,
                    operator: this.minExclusive ? ">" : ">=",
                    right: this.min
                }),
            this.max == null
                ? null
                : new BinaryExpression({
                    location,
                    left: dot,
                    operator: this.maxExclusive ? "<" : "<=",
                    right: this.max
                }),
        )
    }

    merge(b: Type, union: boolean): Type | null {
        if (b instanceof NumberType) {
            return union ? NumberType.union(this, b) : NumberType.intersection(this, b);
        }
        return null;
    }

    simplify(c?: EvaluationContext): Node {
        let debug = "";
        let min = this.min?.simplify(c);
        let max = this.max?.simplify(c);
        let minExclusive = this.minExclusive;
        let maxExclusive = this.maxExclusive;
        if (min instanceof NumberType) {
            if (min.min) {
                minExclusive ||= min.minExclusive;
                min = min.min;
            }
            else if (min.max) {
                if (min.max instanceof NumberLiteral) {
                    if (min.max.integer) {
                        if (min.max instanceof NumberLiteral && (min.maxExclusive || !(max instanceof NumberLiteral && max.value === min.max.value))) {
                            min = min.max.patch({ value: min.max.value - (min.maxExclusive ? 1 : 0) });
                        }
                    }
                }
            }
        }
        if (max instanceof NumberType) {
            if (max.max) {
                maxExclusive ||= max.maxExclusive;
                max = max.max
            }
            else if (max.min) {
                if (max.min instanceof NumberLiteral) {
                    if (max.min.integer) {
                        if (max.min instanceof NumberLiteral && (max.minExclusive || !(min instanceof NumberLiteral && min.value === max.min.value))) {
                            max = max.min.patch({ value: max.min.value + (max.minExclusive ? 1 : 0) });
                        }
                    }
                }
            }
        }
        if ((min != null || max != null) && (min != this.min || max != this.max)) {
            return this.patch({ min, max, minExclusive, maxExclusive });
        }
        return this;
    }

    isAnyNumber() {
        return this.min == null && this.max == null && !this.step;
    }

    isAnyInteger() {
        return this.min == null && this.max == null && !!this.step;
    }

    toString() {
        if (this.min == null && this.max == null) {
            return `(${this.step ? coreTypes.Integer : coreTypes.Number})`;
        }
        if (this.min && this.max && this.min.toString() === this.max.toString()) {
            return `(${this.min})`;
        }
        let text = `(`;
        if (this.min) {
            text += `${this.minExclusive ? "> " : (this.max ? "" : ">= ")}${this.min}`;
        }
        if (this.max) {
            if (this.min) {
                text += ` .. `;
            }
            text += `${this.maxExclusive ? "< " : (this.min ? "" : "<= ")}${this.max}`;
        }
        return text + `)`;
    }

    static adjacent(a: LiteralNumberType, b: LiteralNumberType): boolean | null {
        if (a.min == null && b.min == null || a.max == null && b.max == null) {
            return true
        }
        return overlaps(a.max, b.min, a.maxExclusive && b.minExclusive) && overlaps(b.max, a.min, b.maxExclusive && a.minExclusive);
    }
    

    static union(a: NumberType, b: NumberType): NumberType | null {
        if (a.isAnyNumber()) {
            return b
        }
        if (b.isAnyNumber()) {
            return a
        }
        if (!isLiteralNumberType(a) || !isLiteralNumberType(b)) {
            return null
        }
        if (!NumberType.adjacent(a, b)) {
            return null
        }
        // but only if they overlap at all
        const {min,minExclusive} = a.min == null || b.min == null
            ? {min: null, minExclusive: false }
            : (() => {
                if (a.min.value === b.min.value) {
                    return { min: a.min, minExclusive: Boolean(Math.min(a.minExclusive as any, b.minExclusive as any))}
                }
                if (a.min.value < b.min.value) {
                    return a
                }
                else {
                    return b
                }
            })();
        const {max,maxExclusive} = a.max == null || b.max == null
            ? {max: null, maxExclusive: false }
            : (() => {
                if (a.max.value === b.max.value) {
                    return { max: a.max, maxExclusive: Boolean(Math.min(a.maxExclusive as any, b.maxExclusive as any))}
                }
                if (a.max.value > b.max.value) {
                    return a
                }
                else {
                    return b
                }
            })();

        return new NumberType({
            location: SourceLocation.merge(a.location, b.location),
            min: min as Node,
            max: max as Node,
            minExclusive,
            maxExclusive,
            step: a.step
        })
    }

    static intersection(a: NumberType, b: NumberType): NumberType | null {
        if (a.isAnyNumber()) {
            return b
        }
        if (b.isAnyNumber()) {
            return a
        }
        if (a.isAnyInteger() && b.integer) {
            return b;
        }
        if (b.isAnyInteger() && a.integer) {
            return a;
        }
        const location = SourceLocation.merge(a.location, b.location);
        if (!isLiteralNumberType(a) || !isLiteralNumberType(b)) {
            // if one has min but no max and the other has no min then combine them.
            if (a != null && b != null) {
                let step = mergeStep(a.step, b.step);
                if (a.min != null && a.max == null && b.min == null) {
                    return new NumberType({ location, min: a.min, minExclusive: a.minExclusive, max: b.max, maxExclusive: b.maxExclusive, step });
                }
                if (b.min != null && b.max == null && a.min == null) {
                    return new NumberType({ location, min: b.min, minExclusive: b.minExclusive, max: a.max, maxExclusive: a.maxExclusive, step });
                }
                if (a.max != null && a.min == null && b.max == null) {
                    return new NumberType({ location, max: a.max, maxExclusive: a.minExclusive, min: b.min, minExclusive: b.minExclusive, step });
                }
                if (b.max != null && b.min == null && a.max == null) {
                    return new NumberType({ location, max: b.max, maxExclusive: b.minExclusive, min: a.min, minExclusive: a.minExclusive, step });
                }
            }
            return null
        }
        let min: NumberLiteral | undefined = undefined
        let max: NumberLiteral | undefined = undefined
        let minExclusive: boolean | undefined = false
        let maxExclusive: boolean | undefined = false
        for (let type of [a, b]) {
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
        let result = new NumberType({ location, min, max, minExclusive, maxExclusive, step: a.step }) as LiteralNumberType
        return result
    }

}

function mergeStep(a: number, b: number) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    return leastCommonMultiple(a, b);
}