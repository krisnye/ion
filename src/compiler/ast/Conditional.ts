import { NonFunctionProperties } from "../../types";
import { Node } from "./Node";

type Props = NonFunctionProperties<Conditional>;
export class Conditional extends Node {

    test!: Node;
    consequent!: Node;
    alternate!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}