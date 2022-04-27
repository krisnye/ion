import { Call, isMetaCall, MetaCall } from "./Call";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { Scope } from "./Scope";
import { Instance } from "./Instance";
import { Reference } from "./Reference";

export interface MetaContainer extends Node {
    meta: Node[];
}

export function getMetaCall(container: MetaContainer, globalPath: string): Instance | Call | null {
    let calls = getMetaCalls(container, globalPath);
    if (calls.length > 1) {
        throw new SemanticError(`Can only have a Meta attribute of each type`, ...calls);
    }
    return calls[0] ?? null;
}

function getMetaCalls(container: MetaContainer, globalPath: string) {
    let calls = new Array<Instance | Call>();
    for (let meta of container.meta) {
        // handle both right now
        //  TODO: Fix this later.
        if (meta instanceof Call && meta.callee instanceof Reference && meta.callee.name === globalPath) {
            calls.push(meta);
        } 
        // this only works once the MetaCalls are converted into Instance
        if (meta instanceof Instance && meta.class.name  === globalPath) {
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

export function toMetaString(d: MetaContainer) {
    return d.meta.length ? `${Scope.toString(d.meta, "{", "}\n")}` : "";
}

export function isMetaContainer(node): node is MetaContainer {
    return node != null && Array.isArray(node.meta);
}
