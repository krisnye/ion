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
import { getSSAOriginalName } from "../phases/ssaForm";

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
        if (this.type) {
            yield this.type;
        }
        if (this.value instanceof Expression) {
            yield this.value;
        }
        let originalName = getSSAOriginalName(this.id.name);
        if (originalName !== this.id.name) {
            let originalVariable = c.getVariable(this, originalName);
            yield originalVariable;
        }
    }

    // ensureAssignmentValid(c: EvaluationContext, value: Expression, isInitial = false) {
    // }

    resolveType(c: EvaluationContext) {
        const { value, type } = this;
        let isInitial = true;
        let checkVariable: Variable = this;
        let originalName = getSSAOriginalName(this.id.name);
        if (originalName !== this.id.name) {
            checkVariable = c.getVariable(this, originalName);
            isInitial = false;
        }
        if (checkVariable.type && value?.type) {
            if (checkVariable.constant && !isInitial) {
                throw new SemanticError(`Cannot reassign constant ${this.id.name}`, value);
            }
            if (checkVariable.type && value.type) {
                // check if value type is assignable to this.
                let isValueASubtype = isSubtype(value.type, checkVariable.type, c);
                if (isValueASubtype === false) {
                    if (this.id.name === "test.sample.y#1") {
                        debugger;
                    }
                    throw new SemanticError(`Type ${value.type} cannot be assigned to variable of type ${checkVariable.type}`, value);
                }
                if (isValueASubtype === null) {
                    throw new SemanticError(`Type ${value.type} may not be assignable to variable of type ${checkVariable.type}`, value);
                }
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