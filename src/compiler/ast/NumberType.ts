import { coreTypes } from "../coreTypes";
import { Node, NodeProps } from "../Node";
import { SourceLocation } from "../SourceLocation";
import { Expression } from "./Expression";
import { NumberLiteral } from "./NumberLiteral";
import { Type } from "./Type";

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

export interface NumberTypeProps extends NodeProps {
    min?: Node;
    max?: Node;
    minExclusive?: boolean;
    maxExclusive?: boolean;
    integer?: boolean;
}

export class NumberType extends Node implements Type {

    min?: Expression;
    max?: Expression;
    minExclusive!: boolean;
    maxExclusive!: boolean;
    integer?: boolean;

    constructor(props: NumberTypeProps) {
        if (props.integer == null) {
            let integer: boolean | undefined;
            if (props.min instanceof NumberLiteral) {
                integer = props.min.integer;
            }
            if (integer == null && props.max instanceof NumberLiteral) {
                integer = props.max.integer;
            }
            props.integer = integer ?? false;
        }
        super({ minExclusive: false, maxExclusive: false, ...props});
    }

    static fromConstant(value: number, location: SourceLocation, integer = value === Math.trunc(value)) {
        let literalValue = NumberLiteral.fromConstant(value, location, integer);
        return new NumberType({ location, min: literalValue, max: literalValue, integer });
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

    merge(b: Type, union: boolean): Type | null {
        if (b instanceof NumberType) {
            return union ? NumberType.union(this, b) : NumberType.intersection(this, b);
        }
        return null;
    }

    simplify(): Node {
        let min = this.min?.simplify();
        let max = this.max?.simplify();
        let minExclusive = this.minExclusive;
        let maxExclusive = this.maxExclusive;
        if (min instanceof NumberType && min.min) {
            minExclusive ||= min.minExclusive;
            min = min.min;
        }
        if (max instanceof NumberType && max.max) {
            maxExclusive ||= max.maxExclusive;
            max = max.max
        }
        if ((min != null || max != null) && (min != this.min || max != this.max)) {
            return this.patch({ min, max, minExclusive, maxExclusive });
        }
        return this;
    }

    isSubtypeOf(b: Type): boolean | null {
        const a = this;
        if (b instanceof NumberType) {
            if (this.integer !== b.integer) {
                return false;
            }
            if ((b.min == null || overlaps(a.min, b.min, a.minExclusive < b.minExclusive) === true) &&
                (b.max == null || overlaps(b.max, a.max, a.maxExclusive < b.maxExclusive) === true)
            ) {
                return true
            }
            if (overlaps(a.max, b.min, b.minExclusive || a.maxExclusive) === false || overlaps(b.max, a.min, a.minExclusive || b.maxExclusive) === false) {
                return false
            }
        }
        return null
    }

    toString() {
        if (this.min == null && this.max == null) {
            return `(${this.integer ? coreTypes.Integer : coreTypes.Float})`;
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
        if (a.min == null && a.max == null) {
            return b
        }
        if (b.min == null && b.max == null) {
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
                    return { min: a.min.value, minExclusive: Boolean(Math.min(a.minExclusive as any, b.minExclusive as any))}
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
                    return { max: a.max.value, maxExclusive: Boolean(Math.min(a.maxExclusive as any, b.maxExclusive as any))}
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
            integer: a.integer
        })
    }

    static intersection(a: NumberType, b: NumberType): NumberType | null {
        const location = SourceLocation.merge(a.location, b.location);
        if (!isLiteralNumberType(a) || !isLiteralNumberType(b)) {
            // if one has min but no max and the other has no min then combine them.
            if (a != null && b != null) {
                if (a.min != null && a.max == null && b.min == null) {
                    return new NumberType({ location, min: a.min, minExclusive: a.minExclusive, max: b.max, maxExclusive: b.maxExclusive, integer: a.integer });
                }
                if (b.min != null && b.max == null && a.min == null) {
                    return new NumberType({ location, min: b.min, minExclusive: b.minExclusive, max: a.max, maxExclusive: a.maxExclusive, integer: a.integer });
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
        let result = new NumberType({ location, min, max, minExclusive, maxExclusive, integer: a.integer }) as LiteralNumberType
        return result
    }

}