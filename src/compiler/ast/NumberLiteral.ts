import { EvaluationContext } from "../EvaluationContext";
import { Literal, LiteralProps } from "./Literal";
import { NumberType } from "./NumberType";

export function FloatLiteral(props: Omit<NumberLiteralProps,"integer">) {
    return new NumberLiteral({ integer: false, ...props });
}

export function IntegerLiteral(props: Omit<NumberLiteralProps,"integer">) {
    return new NumberLiteral({ integer: true, ...props });
}

export interface NumberLiteralProps extends LiteralProps {
    integer?: boolean;
    value: number;
}

export class NumberLiteral extends Literal {

    integer!: boolean;
    value!: number;

    constructor(props: NumberLiteralProps) { super(props); }
    patch(props: Partial<NumberLiteralProps>) { return super.patch(props); }

    resolveType(c: EvaluationContext) {
        const value = new NumberLiteral({ ...this, resolved: true });
        return new NumberType({
            location: this.location,
            integer: this.integer,
            min: value,
            max: value,
        });
    }

    toString() {
        let text = `${this.value}`;
        if (!this.integer) {
            text = text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
        }
        return text;
    }

}