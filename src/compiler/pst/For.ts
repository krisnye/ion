import { Block } from "../ast/Block";
import { Node, NodeProps } from "../Node";

export interface ForProps extends NodeProps {
    id: Node;
    value: Node;
    body: Block;
}

export class For extends Node {

    id!: Node;
    value!: Node;
    body!: Block;

    constructor(props: ForProps) { super(props); }
    patch(props: Partial<ForProps>) { return super.patch(props); }

    toString() {
        return `for ${this.id} in ${this.value} ${this.body}`;
    }

}