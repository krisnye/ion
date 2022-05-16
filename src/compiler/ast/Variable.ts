import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { SemanticError } from "../SemanticError";

export interface VariableProps extends ExpressionProps {
    id: Identifier
    value: Expression | null;
    meta: MetaCall[];
}

export class Variable extends Expression implements Declaration {

    id!: Identifier
    value!: Expression | null;
    meta!: MetaCall[];

    constructor(props: VariableProps) { super(props); }
    patch(props: Partial<VariableProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        if (this.value instanceof Expression) {
            yield this.value;
        }
    }

    resolveType(c: EvaluationContext) {
        if (this.type && this.value) {
            // check if value type is assignable to this.
            let isAssignable = isSubtype(this.value.type, this.type, c);
            if (isAssignable === false) {
                throw new SemanticError(`Type ${this.value.type} cannot be assigned to variable of type ${this.type}`, this);
            }
            if (isAssignable === null) {
                debugger;
                isSubtype(this.value.type, this.type, c);
                throw new SemanticError(`Type ${this.value.type} may not be assignable to variable of type ${this.type}`, this);
            }
            if (this.id.name === "sample.one.value") {
                console.log("RESOLVE TYPE " + this + " isAssignable: " + isAssignable);
                // check that the assignment is valid
            }
        }
        return this.type ?? this.value?.type ?? null;
    }

    isType() {
        return isTypeName(this.id.name);
    }

    toString() {
        return `${toMetaString(this)}${this.isType() ? `type` : this.constant ? `const` : `var`} ${this.id}${this.toTypeString()}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}