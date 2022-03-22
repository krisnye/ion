import { NonFunctionProperties } from "../../types";
import { Variable } from "./Variable";
import { Node } from "../Node";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<FunctionBase>;

export class FunctionBase extends Node {

    parameters!: Variable[];
    returnType!: Node | null;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return this.returnType
            ? `${Scope.toString(this.parameters, "(", ")")}: ${this.returnType}`
            : `${Scope.toString(this.parameters, "(", ")")}`;
    }

}