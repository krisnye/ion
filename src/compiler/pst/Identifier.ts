import { NonFunctionProperties } from "../../types";
import { isValidId } from "../common";
import { Node } from "../Node";

type Props = NonFunctionProperties<Identifier>;

export class Identifier extends Node {

    name!: string;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return isValidId(this.name) ? this.name : `\`${this.name}\``;
    }

}