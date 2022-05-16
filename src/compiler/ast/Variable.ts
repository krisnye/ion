import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { SemanticError } from "../SemanticError";
import { Type } from "./Type";
import { Node } from "../Node";

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

    ensureAssignmentValid(c: EvaluationContext, value: Expression, isInitial = false) {
        if (this.constant && !isInitial) {
            throw new SemanticError(`Cannot reassign constant ${this.id.name}`, this.id, value);
        }
        if (this.type && value.type) {
            // check if value type is assignable to this.
            let isValueASubtype = isSubtype(value.type, this.type, c);
            if (isValueASubtype === false) {
                throw new SemanticError(`Type ${value.type} cannot be assigned to variable of type ${this.type}`, this);
            }
            if (isValueASubtype === null) {
                throw new SemanticError(`Type ${value.type} may not be assignable to variable of type ${this.type}`, this);
            }
        }
    }

    resolveType(c: EvaluationContext) {
        if (this.type && this.value?.type) {
            this.ensureAssignmentValid(c, this.value, true);
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