import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { BinaryExpression } from "./BinaryExpression";
import { Class } from "./Class";
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

    merge(b: Type) {
        return null;
    }

    getBasicTypes(c: EvaluationContext) {
        let value = c.getValue(this);
        if (isType(value)) {
            return value.getBasicTypes(c);
        }
        return BasicType.Object;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        // at this point... a TypeReference should ONLY be referencing a class.
        let value = c.getValue(this);
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