import { NonFunctionProperties } from "../../types";
import { Scope } from "../ast/Scope";

type Props = NonFunctionProperties<Module>;

export class Module extends Scope {

    name!: string;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `module ${this.name} ${ super.toString() }`;
    }

}
