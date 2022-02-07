import { NonFunctionProperties } from "../../types";
import { Identifier } from "./Identifier";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Class>;

export class Class extends Scope {

    id!: Identifier;
    extends!: Identifier[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `class ${this.id} extends ${this.extends} ${ super.toString() }`;
    }

}