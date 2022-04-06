import { coreTypes } from "../coreTypes";
import { getValue, GetVariableFunction } from "../phases/createScopeMaps";
import { Literal, LiteralProps } from "./Literal";

export interface StringLiteralProps extends LiteralProps {
    value: string;
}

export class StringLiteral extends Literal {

    constructor(props: StringLiteralProps) { super(props); }
    patch(props: Partial<StringLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        return { "" : coreTypes.String, value: this.value };
    }

    toString() {
        let text = JSON.stringify(this.value);
        return this.type ? `${text} : ${this.type}` : text;
    }

}
