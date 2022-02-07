import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Conditional>;
export class Conditional extends Node {

    test!: Node;
    consequent!: Node;
    alternate!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        if (this.alternate != null) {
            return `if ${this.test} ${this.consequent} else ${this.alternate}`
        }
        else {
            return `if ${this.test} ${this.consequent}`
        }
    }

}