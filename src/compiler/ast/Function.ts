import { Node } from "../Node";
import { FunctionBase, FunctionBaseProps } from "./FunctionBase";

export interface FunctionProps extends FunctionBaseProps {
    body: Node;
}

export class Function extends FunctionBase {

    body!: Node;

    constructor(props: FunctionProps) { super(props); }
    patch(props: Partial<FunctionProps>) { return super.patch(props); }

    toString() {
        return `${super.toString()} => ${this.body}`;
    }

}