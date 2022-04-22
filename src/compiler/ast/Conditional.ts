import { Node, NodeProps } from "../Node";
import { Expression } from "./Expression";

export interface ConditionalProps extends NodeProps {
    test: Expression;
    consequent: Expression;
    alternate: Expression | null;    
}
export class Conditional extends Node {

    test!: Expression;
    consequent!: Expression;
    alternate!: Expression | null;

    constructor(props: ConditionalProps) { super(props); }
    patch(props: Partial<ConditionalProps>) { return super.patch(props); }

    toString() {
        if (this.alternate != null) {
            return `if (${this.test}) ${this.consequent} else ${this.alternate}`
        }
        else {
            return `if (${this.test}) ${this.consequent}`
        }
    }

}