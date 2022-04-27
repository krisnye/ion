import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Literal, LiteralProps } from "./Literal";
import { StringType } from "./StringType";

export interface StringLiteralProps extends LiteralProps {
    value: string;
}

export class StringLiteral extends Literal {

    constructor(props: StringLiteralProps) { super(props); }
    patch(props: Partial<StringLiteralProps>) { return super.patch(props); }

    toInterpreterInstance(c: EvaluationContext) {
        return { "" : coreTypes.String, value: this.value };
    }

    resolveType(c: EvaluationContext) {
        return new StringType({ location: this.location, value: null });
    }

    toString() {
        return `${JSON.stringify(this.value)}${this.toTypeString()}`;
    }

}
