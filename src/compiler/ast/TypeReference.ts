import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";
import { Reference, ReferenceProps } from "./Reference";
import { BasicType, isType, Type } from "./Type";

export interface TypeReferenceProps extends ReferenceProps  {
    typeArguments?: Type[];
}

export class TypeReference extends Reference implements Type  {

    typeArguments!: Type[];

    constructor(props: TypeReferenceProps) {
        super({ typeArguments: [], ...props });
    }
    patch(props: Partial<TypeReferenceProps>) { return super.patch(props); }

    isInstance(c: InterpreterContext, value: InterpreterValue): boolean {
        let type = this.toInterpreterValue(c) as Type;
        return type.isInstance(c, value);
    }

    merge(b: Type) {
        return null;
    }

    getBasicTypes(c: EvaluationContext) {
        if (this.name === coreTypes.Void) {
            return BasicType.Void;
        }
        if (this.name === coreTypes.Null) {
            return BasicType.Null;
        }
        if (this.name === coreTypes.Undefined) {
            return BasicType.Undefined;
        }
        const value = c.getValue(this);
        if (isType(value)) {
            return value.getBasicTypes(c);
        }
        return BasicType.Object;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        // at this point... a TypeReference should ONLY be referencing a class.
        const value = c.getValue(this);
        if (!isType(value)) {
            throw new SemanticError(`Expected Type`, this);
        }
        return value.toDotExpression(c, dot);
    }

    toComparisonType(c: EvaluationContext) {
        const value = c.getValue(this) as Type;
        return c.getComparisonType(value);
    }

}