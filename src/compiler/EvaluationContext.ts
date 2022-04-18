import { Expression } from "./ast/Expression";
import { Reference } from "./ast/Reference";
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

    getValue(ref: Expression): Expression {
        let value = ref;
        while (value instanceof Reference || value instanceof Variable) {
            let variable = value instanceof Variable ? value : this.getVariable(value);
            value = this.getValue(variable.value!);
        }
        return value;
    }

}