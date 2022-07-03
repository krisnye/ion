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

export interface VariableProps extends ExpressionProps {
    id: Identifier;
    value: Expression | null;
    meta: MetaCall[];
    declaredType?: Type | null;
    conditional?: boolean;
}

export class Variable extends Expression implements Declaration {

    id!: Identifier;
    value!: Expression | null;
    meta!: MetaCall[];
    declaredType!: Type | null;
    isDeclaration: true = true;
    conditional!: boolean;

    constructor(props: VariableProps) { super({ conditional: false, ...props }); }
    patch(props: Partial<VariableProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        if (this.declaredType instanceof Expression) {
            yield this.declaredType;
        }
        if (this.type) {
            yield this.type;
        }
        if (this.value instanceof Expression) {
            yield this.value;
        }
    }

    resolveType(c: EvaluationContext) {
        let debug = this.id.name === "test.sample.value";
        const { value, declaredType } = this;
        if (debug) {
            console.log("------ ", {
                this: this.toString(),
                value: value?.toString(),
                declaredType: declaredType?.toString(),
                value_type: value?.type?.toString(),
                conditional: this.conditional,
            });
        }
        if (declaredType && value?.type && !this.conditional) {
            // check if value type is assignable to this.
            let isValueASubtype = isSubtype(value.type, declaredType, c);
            if (isValueASubtype === false) {
                throw new SemanticError(`Type ${value.type} cannot be assigned to variable of type ${declaredType}`, value);
            }
            if (isValueASubtype === null) {
                throw new SemanticError(`Type ${value.type} may not be assignable to variable of type ${declaredType}`, value);
            }
        }
        return this.type ?? this.value?.type ?? this.declaredType ?? null;
    }

    isType() {
        return isTypeName(this.id.name);
    }

    protected toTypeString() {
        if (this.declaredType && this.type && this.declaredType.toString() === this.type.toString()) {
            return ` ::: ${this.type}`;
        }
        return `${this.declaredType ? ` : ${this.declaredType}` : ``}${super.toTypeString()}`;
    }

    toString() {
        return `${toMetaString(this)}${this.isType() ? `type` : this.constant ? `const` : `var`} ${this.id}${this.toTypeString()}${this.value != null ? ` = ${this.value}`: ``}`;
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            //  prevent declaredType from being written if false
            declaredType: this.declaredType ?? void 0,
        };
    }

}