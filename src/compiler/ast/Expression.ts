import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Expression>;

export class Expression extends Node {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}