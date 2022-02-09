import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Token } from "../Token";

type Props = NonFunctionProperties<Group>;
export class Group extends Node {

    open!: Token;
    close!: Token;
    value!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.open.value}${this.value != null ? this.value : ""}${this.close.value}`;
    }

}