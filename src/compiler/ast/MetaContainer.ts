import { isMetaCall, MetaCall } from "./Call";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { Scope } from "./Scope";
import { GetVariableFunction } from "../phases/createScopeMaps";
import { ObjectExpression } from "./ObjectExpression";

export interface MetaContainer {
    meta: Node[];
}

export function getMetaCall(container: MetaContainer, globalPath: string): ObjectExpression | null {
    let calls = getMetaCalls(container, globalPath);
    return calls[0] ?? null;
}

export function getMetaCalls(container: MetaContainer, globalPath: string) {
    let calls = new Array<ObjectExpression>();
    for (let meta of container.meta as ObjectExpression[]) {
        // this only works once the MetaCalls are converted into ObjectExpressions
        if (meta.class.name  === globalPath) {
            calls.push(meta);
        }
    }
    return calls;
}

export function addMetaCallsToContainers<T extends Node>(nodes: Array<T | MetaCall>, errors: Error[]): Array<T> {
    nodes = [...nodes];
    for (let i = nodes.length; i > 0; i--) {
        const a = nodes[i - 1];
        const b = nodes[i];
        if (isMetaCall(a)) {
            if (isMetaContainer(b)) {
                nodes.splice(i - 1, 2, (b as any).patch({ meta: [a, ...b.meta] }));
            }
            else {
                errors.push(new SemanticError(`Meta only valid before Declarations`, a));
            }
        }
    }
    return nodes as T[];
}

export function metaToString(d: MetaContainer) {
    return d.meta.length ? `${Scope.toString(d.meta, "{", "}\n")}` : "";
}

export function isMetaContainer(node): node is MetaContainer {
    return node != null && Array.isArray(node.meta);
}
