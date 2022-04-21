import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { AnyType } from "./AnyType";

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
        if (this.value) {
            yield this.value;
        }
    }

    resolveType(c: EvaluationContext) {
        return this.type ?? this.value?.type ?? new AnyType({ location: this.location });
    }

    isType() {
        return isTypeName(this.id.name);
    }

    toString() {
        return `${toMetaString(this)}${this.isType() ? `type` : this.constant ? `const` : `var`} ${this.id}${this.toTypeString()}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}