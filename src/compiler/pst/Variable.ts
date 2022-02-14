import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Variable>;

export class Variable extends Node {

    id!: Node 
    type!: Node | null;
    value!: Node | null;
    writable!: boolean;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${this.writable ? `var` : `const`} ${this.id}${this.type != null ? ` : ${this.type}`: ``}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}