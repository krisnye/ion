import { Identifier } from "./Identifier";
import { isMetaCall, MetaCall } from "./Call";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";

export interface Declaration {

    id: Identifier;
    meta: MetaCall[];

}

export function addMetaCallsToDeclarations(nodes: Node[], errors: Error[]) {
    nodes = [...nodes];
    for (let i = nodes.length; i > 0; i--) {
        let a = nodes[i - 1];
        let b = nodes[i];
        if (isMetaCall(a)) {
            if (isDeclaration(b)) {
                nodes.splice(i - 1, 2, b.patch({ meta: [a, ...b.meta] }));
            }
            else {
                errors.push(new SemanticError(`Meta only valid before Declarations`, a));
            }
        }
    }
    return nodes;
}

export function isDeclaration(node): node is Declaration {
    return node != null && node.id instanceof Identifier && Array.isArray(node.meta);
}