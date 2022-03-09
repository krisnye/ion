import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Call>;

export class Call extends Scope {

    callee!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.nodes})`;
    }

}