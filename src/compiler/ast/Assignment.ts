import { Node, NodeProps } from "../Node";
import { Reference } from "./Reference";

export interface AssignmentProps extends NodeProps {
    id: Reference;
    value: Node;
}
export class Assignment extends Node {

    id!: Reference;
    value!: Node;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    toString() {
        return `${this.id} = ${this.value}`;
    }

}