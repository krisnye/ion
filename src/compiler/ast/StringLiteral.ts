import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Literal, LiteralProps } from "./Literal";
import { TypeReference } from "./TypeReference";

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
        return new TypeReference({ location: this.location, name: coreTypes.String });
    }

    toString() {
        return `${JSON.stringify(this.value)}${this.toTypeString()}`;
    }

}
