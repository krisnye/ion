import { Identifier } from "./Identifier";
import { isMetaCall, MetaCall } from "./Call";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { Scope } from "./Scope";

export interface Declaration {

    id: Identifier;
    meta: MetaCall[];

}

export function addMetaCallsToDeclarations<T extends Node>(nodes: Array<T | MetaCall>, errors: Error[]): Array<T> {
    nodes = [...nodes];
    for (let i = nodes.length; i > 0; i--) {
        const a = nodes[i - 1];
        const b = nodes[i];
        if (isMetaCall(a)) {
            if (isDeclaration(b)) {
                nodes.splice(i - 1, 2, (b as any).patch({ meta: [a, ...b.meta] }));
            }
            else {
                errors.push(new SemanticError(`Meta only valid before Declarations`, a));
            }
        }
    }
    return nodes as T[];
}

export function metaToString(d: Declaration) {
    return d.meta.length ? `${Scope.toString(d.meta, "{", "}\n")}` : "";
}

export function isDeclaration(node): node is Declaration {
    return node != null && node.id instanceof Identifier && Array.isArray(node.meta);
}