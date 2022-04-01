import { NonFunctionProperties } from "../../types";
import { Scope } from "../ast/Scope";

type Props = NonFunctionProperties<Module>;

export class Module extends Scope {

    name!: string;
    dependencies!: string[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        if (this.dependencies.length > 0) {
            return `module ${this.name} ${ super.toString() }\n// externals: ${this.dependencies}`;
        }
        else {
            return `module ${this.name} ${ super.toString() }`;
        }
    }

}
