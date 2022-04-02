import { Node, NodeProps } from "../Node";

export interface LiteralProps extends NodeProps {
    value: any;
}

export class Literal extends Node {

    constructor(props: LiteralProps) { super(props); }
    patch(props: Partial<LiteralProps>) { return super.patch(props); }

    value!: any;

}