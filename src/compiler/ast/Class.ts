import { NonFunctionProperties } from "../../types";
import { Identifier } from "../ast/Identifier";
import { Scope } from "./Scope";
import { Expression } from "./Expression";
import { Variable } from "../pst/Variable";

type Props = NonFunctionProperties<Class>;

export class Class extends Scope {

    id!: Identifier;
    extends!: Expression[];
    nodes!: Variable[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ super.toString() }`;
    }

}