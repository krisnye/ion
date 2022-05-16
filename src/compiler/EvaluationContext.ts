import { Expression } from "./ast/Expression";
import { NumberType } from "./ast/NumberType";
import { Reference } from "./ast/Reference";
import { Type } from "./ast/Type";
import { Variable } from "./ast/Variable";
import { GetVariableFunction } from "./phases/createScopeMaps";
import { Lookup } from "./traverse";

export class EvaluationContext {

    public readonly errors = new Array<Error>();

    constructor(
        public readonly getVariable: GetVariableFunction,
        public readonly lookup: Lookup,
    ) {
    }

    private comparisonTypes = new Map<Type,Type>();
    getComparisonType(type: Type): Type {
        let check = this.comparisonTypes.get(type);
        if (check == null) {
            this.comparisonTypes.set(type, check = (type.toComparisonType?.(this) ?? type));
            // if (!(type instanceof NumberType)) {
            //     console.log(type + "\n    ==>   " + check);
            // }
        }
        return check;
    }

    getValue(ref: Expression): Expression {
        let value = ref;
        while (value instanceof Reference || value instanceof Variable) {
            let variable = value instanceof Variable ? value : this.getVariable(value);
            value = this.getValue(variable.value!);
        }
        return value;
    }

}