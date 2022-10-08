import { InterpreterContext, InterpreterInstance, InterpreterValue } from "../../interpreter";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Serializable } from "../Serializable";
import { SourceLocation } from "../SourceLocation";
import { ExpressionProps } from "./Expression";
import { Literal, LiteralProps } from "./Literal";
import { Type } from "./Type";
import { TypeReference } from "./TypeReference";

export interface NullLiteralProps extends LiteralProps {
    value: any;
}

export class NullLiteral extends Literal {

    value!: null;

    constructor(props: NullLiteralProps) { super({ ...props, value: null }); }
    patch(props: Partial<NullLiteralProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext): Type {
        return new TypeReference({ location: this.location, name: coreTypes.Null });
    }

    toInterpreterValue(c: InterpreterContext): void | InterpreterValue {
        return new InterpreterInstance(null);
    }

    toString() {
        return "null";
    }

}