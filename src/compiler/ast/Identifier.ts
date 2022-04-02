import { isValidId } from "../common";
import { Node, NodeProps } from "../Node";

export interface IdentifierProps extends NodeProps {
    name: string;
}

export class Identifier extends Node {

    name!: string;

    constructor(props: IdentifierProps) { super(props); }
    patch(props: Partial<IdentifierProps>) { return super.patch(props); }

    toString() {
        return isValidId(this.name) ? this.name : `\`${this.name}\``;
    }

}