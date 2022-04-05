import { coreTypes } from "../coreTypes";
import { GetVariableFunction } from "../phases/createScopeMaps";
import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";

export interface FloatLiteralProps extends NumberLiteralProps {
}

export class FloatLiteral extends NumberLiteral {

    constructor(props: FloatLiteralProps) { super(props); }
    patch(props: Partial<FloatLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        return { "" : coreTypes.Float, value: this.value };
    }

    toString() {
        let text = this.value.toString();
        text = text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
        return this.type ? `${text} : ${this.type}` : text;
    }

}