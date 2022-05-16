import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { Type, BasicType } from "./Type";
import { TypeReference } from "./TypeReference";

export interface BaseTypeProps extends ExpressionProps {
}

/**
 * Interface for identifying Type nodes.
 */
export abstract class BaseType extends Expression implements Type {

    constructor(props: BaseTypeProps) { super(props); }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }

    protected resolveType(c: EvaluationContext): Type | null {
        return new TypeReference({
            location: this.location,
            name: coreTypes.Type,
            resolved: true,
        });
    }

    abstract getBasicTypes(c: EvaluationContext): BasicType;
    abstract toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression;

}
