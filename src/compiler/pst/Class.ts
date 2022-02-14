import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Identifier } from "./Identifier";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Class>;

export class Class extends Scope {

    id!: Identifier;
    extends!: Node | Node[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        let ex = this.extends.toString();
        return `class ${this.id}${ex.length > 0 ? " extends " + ex : ""} ${ super.toString() }`;
    }

}