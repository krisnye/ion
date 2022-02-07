import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Variable>;

export class Variable extends Node {

    id!: Node;
    type!: Node | null;
    value!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}