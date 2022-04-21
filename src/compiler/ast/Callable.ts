import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { Type } from "./Type";

export interface Callable extends Node {
    call(args: Node[]): Node;
    getReturnType(args: Type[], c: EvaluationContext): Type | null;
}

export function isCallable(node): node is Callable {
    return node?.call instanceof Function;
}
