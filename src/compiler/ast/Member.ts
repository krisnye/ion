import { NonFunctionProperties } from "../../types";
import { Node } from "./Node";

type Props = NonFunctionProperties<Member>;

export class Member extends Node {

    object!: Node;
    property!: Node;
    computed!: boolean;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}