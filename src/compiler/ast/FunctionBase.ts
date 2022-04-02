import { Variable } from "./Variable";
import { Node, NodeProps } from "../Node";
import { Scope } from "./Scope";
import { MetaContainer, metaToString } from "./MetaContainer";
import { MetaCall } from "./Call";

export interface FunctionBaseProps extends NodeProps {
    parameters: Variable[];
    returnType: Node | null;
    meta: MetaCall[];
}

export class FunctionBase extends Node implements MetaContainer {

    parameters!: Variable[];
    returnType!: Node | null;
    meta!: MetaCall[];

    constructor(props: FunctionBaseProps) { super(props); }
    patch(props: Partial<FunctionBaseProps>) { return super.patch(props); }

    toString() {
        return this.returnType
            ? `${metaToString(this)}${Scope.toString(this.parameters, "(", ")")}: ${this.returnType}`
            : `${metaToString(this)}${Scope.toString(this.parameters, "(", ")")}`;
    }

}