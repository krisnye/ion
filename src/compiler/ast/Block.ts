import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { EvaluationContext } from "../EvaluationContext";
import { Container, ContainerProps } from "./Container";
import { Expression } from "./Expression";

export interface BlockProps extends ContainerProps {

}

export class Block extends Container {

    constructor(props: ContainerProps) { super(props); }
    patch(props: Partial<ContainerProps>) { return super.patch(props); }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        for (let node of this.nodes) {
            node.toInterpreterValue(c);
            if (c.returnValue) {
                return;
            }
        }
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "BlockStatement",
            body: this.nodes.map(node => node.toESNode(c))
        }
    }
    
}

export function addToBlock(node: Block | Expression, add: Expression, front = false)
{
    let block = node instanceof Block ? node : new Block({ location: node.location, nodes: [ node ] });
    let nodes = block.nodes.slice(0);
    nodes[front ? `unshift` : `push`](add);
    return block.patch({ nodes });
}
