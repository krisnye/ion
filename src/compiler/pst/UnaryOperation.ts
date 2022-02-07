import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Token } from "../Token";

type Props = NonFunctionProperties<UnaryOperation>;
export class UnaryOperation extends Node {

    operator!: Token;
    value!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.operator} ${this.value}`;
    }

}