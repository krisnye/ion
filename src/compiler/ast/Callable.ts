import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { SimpleObjectType } from "./ObjectType";
import { Type } from "./Type";

export interface Callable extends Node {
    call(args: Node[]): Node;
    getReturnType(args: Type[], c: EvaluationContext): Type | null;
    // getInstanceType?(c: EvaluationContext): SimpleObjectType;
}

export function isCallable(node): node is Callable {
    return node?.call instanceof Function;
}
