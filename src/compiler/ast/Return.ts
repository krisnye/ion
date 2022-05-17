import { Expression } from "./Expression";
import { Node, NodeProps } from "../Node";

export interface ReturnProps extends NodeProps {
    value: Expression;
}

export class Return extends Node {

    value!: Expression;

    constructor(props: ReturnProps) { super(props); }
    patch(props: Partial<ReturnProps>) { return super.patch(props); }

    toString() {
        return `return ${this.value}`;
    }

}
