import { coreTypes } from "../coreTypes";
import { GetVariableFunction } from "../phases/createScopeMaps";
import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";

export interface IntegerLiteralProps extends NumberLiteralProps {
}

export class IntegerLiteral extends NumberLiteral {

    constructor(props: IntegerLiteralProps) { super(props); }
    patch(props: Partial<IntegerLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        return { "" : coreTypes.Integer, value: this.value };
    }

    toString() {
        let text = this.value.toString();
        return this.type ? `${text} : ${this.type}` : text;
    }

}