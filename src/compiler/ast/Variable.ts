import { Node, NodeProps } from "../Node";
import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { metaToString } from "./MetaContainer";

export interface VariableProps extends NodeProps {
    id: Identifier
    type: Node | null;
    value: Node | null;
    writable: boolean;
    meta: MetaCall[];
}

export class Variable extends Node implements Declaration {

    id!: Identifier
    type!: Node | null;
    value!: Node | null;
    writable!: boolean;
    meta!: MetaCall[];

    constructor(props: VariableProps) { super(props); }
    patch(props: Partial<VariableProps>) { return super.patch(props); }

    toString() {
        return `${metaToString(this)}${this.writable ? `var` : `const`} ${this.id}${this.type != null ? ` : ${this.type}`: ``}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}