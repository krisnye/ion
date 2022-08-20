import { Expression } from "./Expression";
import { Node, NodeProps } from "../Node";
import { EvaluationContext } from "../EvaluationContext";

export interface ReturnProps extends NodeProps {
    value: Expression;
}

export class Return extends Node {

    value!: Expression;

    constructor(props: ReturnProps) { super(props); }
    patch(props: Partial<ReturnProps>) { return super.patch(props); }

    toString() {
        return `return ${this.value}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "ReturnStatement",
            argument: this.value.toESNode(c)
        }
    }

}
