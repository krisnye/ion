import { NonFunctionProperties } from "../../types";
import { Token } from "../tokenizer/Token";
import { Node } from "./Node";

type Props = NonFunctionProperties<Assignment>;
export class Assignment extends Node {

    id!: Node;
    value!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}