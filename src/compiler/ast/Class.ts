import { NonFunctionProperties } from "../../types";
import { Identifier } from "../ast/Identifier";
import { Scope } from "./Scope";
import { Expression } from "./Expression";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { MetaCall } from "./Call";
import { metaToString } from "./MetaContainer";

type Props = NonFunctionProperties<Class>;

export class Class extends Scope implements Declaration {

    id!: Identifier;
    extends!: Expression[];
    nodes!: Variable[];
    meta!: MetaCall[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${metaToString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Scope.toString([...this.meta, ...this.nodes]) }`;
    }

}