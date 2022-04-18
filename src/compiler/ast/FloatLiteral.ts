import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";
import { NumberType } from "./NumberType";

export interface FloatLiteralProps extends NumberLiteralProps {
}

export class FloatLiteral extends NumberLiteral {

    constructor(props: FloatLiteralProps) { super(props); }
    patch(props: Partial<FloatLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : coreTypes.Float, value: this.value };
    }

    resolveType(c: EvaluationContext) {
        const value = new FloatLiteral({ ...this, resolved: true });
        return new NumberType({
            location: this.location,
            min: value,
            max: value,
        });
    }

    toString() {
        let text = this.value.toString();
        text = text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
        return text;
    }

}