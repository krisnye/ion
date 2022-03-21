import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { FunctionBase } from "./FunctionBase";

type Props = NonFunctionProperties<Function>;

export class Function extends FunctionBase {

    body!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `${super.toString()} => ${this.body}`;
    }

}