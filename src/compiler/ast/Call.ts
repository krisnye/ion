import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { isMetaName } from "../utility";
import { Reference } from "./Reference";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Call>;

export type MetaCall = Call & { callee: Reference }

export function isMetaCall(node): node is MetaCall {
    return node instanceof Call && node.callee instanceof Reference && isMetaName(node.callee.name);
}

export class Call extends Scope {

    callee!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.nodes})`;
    }

}