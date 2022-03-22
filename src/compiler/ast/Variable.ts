import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Variable>;

export class Variable extends Node implements Declaration {

    id!: Identifier
    type!: Node | null;
    value!: Node | null;
    writable!: boolean;
    meta!: MetaCall[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${ this.meta.length ? `${Scope.toString(this.meta, "{", "}\n")}` : "" }${this.writable ? `var` : `const`} ${this.id}${this.type != null ? ` : ${this.type}`: ``}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}