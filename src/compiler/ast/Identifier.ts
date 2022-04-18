import { isValidId } from "../common";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Type } from "./Type";
import { VoidType } from "./VoidType";

export interface IdentifierProps extends ExpressionProps {
    name: string;
}

export class Identifier extends Expression {

    name!: string;

    constructor(props: IdentifierProps) { super(props); }
    patch(props: Partial<IdentifierProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext): Type | null {
        return new VoidType({ location: this.location });
    }

    toString() {
        return `${isValidId(this.name) ? this.name : `\`${this.name}\``}`;
    }

}