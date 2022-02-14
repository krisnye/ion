import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Call>;

export class Call extends Node {

    callee!: Node;
    args!: Node | Node[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.args})`;
    }

}