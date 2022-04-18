import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { GetVariableFunction } from "../phases/createScopeMaps";
import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";
import { NumberType } from "./NumberType";

export interface IntegerLiteralProps extends NumberLiteralProps {
}

export class IntegerLiteral extends NumberLiteral {

    constructor(props: IntegerLiteralProps) { super(props); }
    patch(props: Partial<IntegerLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : coreTypes.Integer, value: this.value };
    }

    resolveType(c: EvaluationContext) {
        const value = new IntegerLiteral({ ...this, resolved: true });
        return new NumberType({
            location: this.location,
            min: value,
            max: value,
        });
    }

    toString() {
        return `${this.value}`;
    }

}