import { Declaration, isDeclaration } from "./ast/Declaration";
import { Expression } from "./ast/Expression";
import { Reference } from "./ast/Reference";
import { Type } from "./ast/Type";
import { Variable } from "./ast/Variable";
import { Node } from "./Node";
import { GetVariableFunction as GetDeclarationsFunction } from "./phases/frontend/createScopeMaps";
import { Lookup } from "./traverse";

export class EvaluationContext {

    public readonly errors = new Array<Error>();

    constructor(
        public readonly getDeclarations: GetDeclarationsFunction,
        public readonly lookup: Lookup,
    ) {
    }

    getDeclaration(ref: Node, name: string): Declaration 
    getDeclaration(ref: Reference): Declaration
    getDeclaration(ref: Node | Reference, name?: string): Declaration {
        let declarations = this.getDeclarations(ref, name);
        return declarations[0];
    }

    private comparisonTypes = new Map<Type,Type>();
    getComparisonType(type: Type): Type {
        let check = this.comparisonTypes.get(type);
        if (check == null) {
            this.comparisonTypes.set(type, check = (type.toComparisonType?.(this) ?? type));
        }
        return check;
    }

    getValues(ref: Expression): Expression[] {
        let value = ref;
        while (value instanceof Reference || value instanceof Variable) {
            let variable: Declaration | Declaration[] = value instanceof Variable ? value : this.getDeclarations(value);
            if (Array.isArray(variable)) {
                if (variable.length > 1) {
                    return variable.map(v => {
                        return v.value!;
                    });
                }
                variable = variable[0]!;
            }
            value = this.getValue(variable.value!);
        }
        if (isDeclaration(value)) {
            value = value.value!;
        }
        return [value];
    }

    getValue(ref: Expression): Expression {
        let values = this.getValues(ref);
        return values[0];
    }

}