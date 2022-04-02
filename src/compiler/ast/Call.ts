import { Node } from "../Node";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Scope, ScopeProps } from "./Scope";

export interface AssignmentProps extends ScopeProps {
    callee: Node;
}

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

export class Call extends Scope {

    callee!: Node;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.nodes})`;
    }

}