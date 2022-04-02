import { Node, NodeProps } from "../Node";
import { Token } from "../Token";

export interface UnaryOperationProps extends NodeProps {
    operator: Token;
    value: Node;
}
export class UnaryOperation extends Node {

    operator!: Token;
    value!: Node;

    constructor(props: UnaryOperationProps) { super(props); }
    patch(props: Partial<UnaryOperationProps>) { return super.patch(props); }

    toString() {
        return `${this.operator} ${this.value}`;
    }

}