import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Token } from "../Token";
import { Identifier } from "./Identifier";

type Props = NonFunctionProperties<Assignment>;
export class Assignment extends Node {

    id!: Node;
    operator!: Token;
    value!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.id} ${this.operator} ${this.value}`;
    }

}