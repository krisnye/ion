import { Node, NodeProps } from "../Node";

export interface MemberProps extends NodeProps {
    object: Node;
    property: Node;
    computed: boolean;
}

export class Member extends Node {

    object!: Node;
    property!: Node;
    computed!: boolean;

    constructor(props: MemberProps) { super(props); }
    patch(props: Partial<MemberProps>) { return super.patch(props); }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

}