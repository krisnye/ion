import { Node, NodeProps } from "../Node";

export interface ConditionalProps extends NodeProps {
    test: Node;
    consequent: Node;
    alternate: Node | null;    
}
export class Conditional extends Node {

    test!: Node;
    consequent!: Node;
    alternate!: Node | null;

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