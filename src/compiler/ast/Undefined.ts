import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Type } from "./Type";
import { TypeReference } from "./TypeReference";

export interface UndefinedProps extends ExpressionProps {
}

export class Undefined extends Expression {

    constructor(props: UndefinedProps) { super(props); }
    patch(props: Partial<UndefinedProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext): Type {
        return new TypeReference({ location: this.location, name: coreTypes.Undefined });
    }

    toString() {
        return "undefined";
    }

}