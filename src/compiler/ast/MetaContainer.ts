import { Call, isMetaCall, MetaCall } from "./Call";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { Container } from "./Container";
import { Reference } from "./Reference";
import { EvaluationContext } from "../EvaluationContext";
import { Class } from "./Class";
import { Expression } from "./Expression";

export interface MetaContainer extends Node {
    meta: Node[];
}

export function getMetaFieldArgument(call: MetaCall, field: string, c: EvaluationContext): Expression | null {
    let nativeClass = c.getValue(call.callee) as Class;
    let index = nativeClass.nodes.findIndex(node => node.id.name === field);
    if (index >= 0) {
        return call.nodes[index];
    }
    return null;
}

export function getMetaFieldValue(call: MetaCall, field: string, c: EvaluationContext): Expression | null {
    let arg = getMetaFieldArgument(call, field, c);
    return arg ? c.getValue(arg) : null;
}

export function getMetaCall(container: MetaContainer, globalPath: string): MetaCall | null {
    let calls = getMetaCalls(container, globalPath);
    if (calls.length > 1) {
        throw new SemanticError(`Can only have a Meta attribute of each type`, ...calls);
    }
    return calls[0] as MetaCall ?? null;
}

export function getMetaCalls(container: MetaContainer, globalPath: string) {
    let calls = new Array<Call>();
    for (let meta of container.meta) {
        // handle both right now
        //  TODO: Fix this later.
        if (meta instanceof Call && meta.callee instanceof Reference && meta.callee.name === globalPath) {
            calls.push(meta);
        } 
        // // this only works once the MetaCalls are converted into Instance
        // if (meta instanceof Instance && meta.class.name  === globalPath) {
        //     calls.push(meta);
        // }
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
    return d.meta.length ? `${Container.toString(d.meta, "{", "}\n")}` : "";
}

export function isMetaContainer(node): node is MetaContainer {
    return node != null && Array.isArray(node.meta);
}
