import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Literal, LiteralProps } from "./Literal";

export interface StringLiteralProps extends LiteralProps {
    value: string;
}

export class StringLiteral extends Literal {

    constructor(props: StringLiteralProps) { super(props); }
    patch(props: Partial<StringLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : coreTypes.String, value: this.value };
    }

    toString() {
        return `${JSON.stringify(this.value)}${this.toTypeString()}`;
    }

}
