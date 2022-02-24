import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Identifier } from "../ast/Identifier";
import { Scope } from "../ast/Scope";

type Props = NonFunctionProperties<PstClass>;

class PstClass extends Scope {

    id!: Identifier;
    extends!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        let ex = this.extends?.toString() ?? "";
        return `class ${this.id}${ex.length > 0 ? " extends " + ex : ""} ${ super.toString() }`;
    }

}

export const Class = PstClass;
