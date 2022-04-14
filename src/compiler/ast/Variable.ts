import { Node, NodeProps } from "../Node";
import { Declaration } from "./Declaration";
import { Identifier } from "./Identifier";
import { MetaCall } from "./Call";
import { metaToString } from "./MetaContainer";
import { isTypeName } from "../utility";

export interface VariableProps extends NodeProps {
    id: Identifier
    value: Node | null;
    meta: MetaCall[];
}

export class Variable extends Node implements Declaration {

    id!: Identifier
    value!: Node | null;
    meta!: MetaCall[];

    constructor(props: VariableProps) { super(props); }
    patch(props: Partial<VariableProps>) { return super.patch(props); }

    isType() {
        return isTypeName(this.id.name);
    }

    toString() {
        return `${metaToString(this)}${this.isType() ? `type` : this.constant ? `const` : `var`} ${this.id}${this.type != null ? ` : ${this.type}`: ``}${this.value != null ? ` = ${this.value}`: ``}`;
    }

}