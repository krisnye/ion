import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Variable } from "./Variable";

type Props = NonFunctionProperties<Function>;

export class Function extends Node {

    parameters!: Variable[];
    body!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `(${this.parameters}) => ${this.body}`
    }

}