import { Expression } from "../ast/Expression";
import { Node, NodeProps } from "../Node";
import { Token } from "../Token";

export interface GroupProps extends NodeProps {
    open: Token;
    close: Token;
    value: Node | null;
}
export class Group extends Node {

    open!: Token;
    close!: Token;
    value!: Expression | null;

    constructor(props: GroupProps) { super(props); }
    patch(props: Partial<GroupProps>) { return super.patch(props); }

    toString() {
        return `${this.open.value}${this.value != null ? this.value : ""}${this.close.value}`;
    }

}