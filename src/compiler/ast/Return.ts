import { NonFunctionProperties } from "../../types";
import { Node } from "./Node";

type Props = NonFunctionProperties<Return>;

export class Return extends Node {

    value!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}
