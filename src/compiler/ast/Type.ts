import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { BinaryExpression } from "./BinaryExpression";
import { Expression } from "./Expression";

/**
 * Interface for identifying Type nodes.
 */
export interface Type extends Node {

    merge(b: Type, union: boolean): Type | null;
    isSubtypeOf(b: Type): boolean | null;
    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression;

}

export function isType(node): node is Type {
    return typeof node?.merge === "function";
}