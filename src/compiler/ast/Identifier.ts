import { NonFunctionProperties } from "../../types";
import { Node } from "./Node";

type Props = NonFunctionProperties<Identifier>;

export class Identifier extends Node {

    name!: string;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}