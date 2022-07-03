import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import type { Call } from "./Call";
import { Expression } from "./Expression";
import { SimpleObjectType } from "./ObjectType";
import { Type } from "./Type";

export interface Callable extends Expression {
    call(args: Node[]): Node;
    getReturnType(source: Call, args: Type[], c: EvaluationContext): Type | null;
    // getInstanceType?(c: EvaluationContext): SimpleObjectType;
}

export function isCallable(node): node is Callable {
    return node?.call instanceof Function;
}
