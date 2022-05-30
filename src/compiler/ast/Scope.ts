import { Node } from "../Node";
import { Expression } from "./Expression";

export function isScope(node): node is Scope {
    return node?.isScope === true;
}

export interface Scope extends Expression {
    isScope: boolean;
    nodes: Node[];
}
