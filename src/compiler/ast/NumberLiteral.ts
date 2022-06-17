import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Serializable } from "../Serializable";
import { SourceLocation } from "../SourceLocation";
import { Literal, LiteralProps } from "./Literal";
import { NumberType } from "./NumberType";
import { Type } from "./Type";

export function FloatLiteral(props: Omit<NumberLiteralProps,"integer">) {
    return new NumberLiteral({ integer: false, ...props });
}

export function IntegerLiteral(props: Omit<NumberLiteralProps,"integer">) {
    return new NumberLiteral({ integer: true, ...props });
}

export interface NumberLiteralProps extends LiteralProps {
    integer?: boolean | null | undefined;
    value: number;
}

export class NumberLiteral extends Literal {

    integer!: boolean;
    value!: number;

    constructor(props: NumberLiteralProps) { super(props); }
    patch(props: Partial<NumberLiteralProps>) { return super.patch(props); }

    static fromConstant(value: number, location: SourceLocation, integer: boolean | null) {
        return new NumberLiteral({ location, value, integer });
    }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : this.integer ? coreTypes.Integer : coreTypes.Number, value: this.value };
    }

    protected resolveType(c: EvaluationContext): Type {
        const value = new NumberLiteral({ ...this, resolved: true });
        return new NumberType({
            location: this.location,
            step: this.integer,
            min: value,
            max: value,
        });
    }

    toJSON() {
        const { value, integer } = this;
        return { "": this.constructor.name, integer, value };
    }

    toString() {
        let text = `${this.value}`;
        if (!this.integer) {
            text = text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
        }
        return text;
    }

}