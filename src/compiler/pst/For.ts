import { NonFunctionProperties } from "../../types";
import { Block } from "../ast/Block";
import { Node } from "../Node";

type Props = NonFunctionProperties<For>;

export class For extends Node {

    id!: Node;
    value!: Node;
    body!: Block;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `for ${this.id} in ${this.value} ${this.body}`;
    }

}