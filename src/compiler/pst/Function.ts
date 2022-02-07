import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Function>;

export class Function extends Node {

    parameters!: Node;
    body!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}