import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Group>;
export class Group extends Node {

    value!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `(${this.value})`;
    }

}