import { Node } from "../Node";
import { NumberType } from "./NumberType";

/**
 * Interface for identifying Type nodes.
 */
export interface Type extends Node {

    merge(b: Type, union: boolean): Type | null;
    isSubtypeOf(b: Type): boolean | null;

}

export function isType(node): node is Type {
    return typeof node.merge === "function";
}