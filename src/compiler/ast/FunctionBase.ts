import { NonFunctionProperties } from "../../types";
import { Variable } from "./Variable";
import { Node } from "../Node";
import { Scope } from "./Scope";
import { MetaContainer, metaToString } from "./MetaContainer";
import { MetaCall } from "./Call";

type Props = NonFunctionProperties<FunctionBase>;

export class FunctionBase extends Node implements MetaContainer {

    parameters!: Variable[];
    returnType!: Node | null;
    meta!: MetaCall[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return this.returnType
            ? `${metaToString(this)}${Scope.toString(this.parameters, "(", ")")}: ${this.returnType}`
            : `${metaToString(this)}${Scope.toString(this.parameters, "(", ")")}`;
    }

}