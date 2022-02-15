import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Expression } from "./Expression";
import { Reference } from "./Reference";

type Props = NonFunctionProperties<Assignment>;
export class Assignment extends Node {

    id!: Reference;
    value!: Expression;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.id} = ${this.value}`;
    }

}