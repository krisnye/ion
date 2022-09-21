import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
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

    isInstance(c: InterpreterContext, value: InterpreterValue): boolean {
        throw new Error(`${this.constructor.name}.isInstance not implemented: ${this}`);
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        return this;
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
