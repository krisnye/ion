import { EvaluationContext } from "../EvaluationContext";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";

export enum BasicType {
    None        = 0,
    Number      = 1 << 0,
    String      = 1 << 1,
    Object      = 1 << 2,
    Structure   = 1 << 3,
    Array       = 1 << 4,
    Map         = 1 << 5,
    Function    = 1 << 6,
    Type        = 1 << 7,
    All         = 0xFF,
}

/**
 * Interface for identifying Type nodes.
 */
export interface Type extends Expression {

    merge(b: Type, union: boolean, c?: EvaluationContext): Type | null;
    getBasicTypes(c: EvaluationContext): BasicType;
    // may end up being used for code generation.
    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression;
    toComparisonType?(c: EvaluationContext): Type;
 
}

export function isType(node): node is Type {
    return typeof node?.merge === "function";
}