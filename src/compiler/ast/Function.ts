import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Variable } from "./Variable";

type Props = NonFunctionProperties<Function>;

export class Function extends Node {

    parameters!: Variable[];
    body!: Node;    // should this be a block, more likely an expression.

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `(${this.parameters}) => ${this.body}`
    }

}