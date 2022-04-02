import { Node, NodeProps } from "../Node";

export interface ReturnProps extends NodeProps {
    value: Node;
}

export class Return extends Node {

    value!: Node;

    constructor(props: ReturnProps) { super(props); }
    patch(props: Partial<ReturnProps>) { return super.patch(props); }

    toString() {
        return `return ${this.value}`;
    }

}
