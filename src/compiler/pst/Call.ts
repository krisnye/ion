import { Node, NodeProps } from "../Node";

export interface CallProps extends NodeProps {
    callee: Node;
    args: Node | null;
}

export class Call extends Node {

    callee!: Node;
    args!: Node | null;

    constructor(props: CallProps) { super(props); }
    patch(props: Partial<CallProps>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.args != null ? this.args : ""})`;
    }

}