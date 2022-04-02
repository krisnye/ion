import { Node, NodeProps } from "../Node";
import { infixPrecedence } from "../parser/operators";
import { Token } from "../Token";

export interface BinaryOperationProps extends NodeProps {
    left: Node;
    operator: Token;
    right: Node;
}
export class BinaryOperation extends Node {

    left!: Node;
    operator!: Token;
    right!: Node;

    constructor(props: BinaryOperationProps) { super(props); }
    patch(props: Partial<BinaryOperationProps>) { return super.patch(props); }

    getPrecedence() {
        return infixPrecedence[this.operator.value]!;
    }

    toString(parentPrecedence = 0) {
        return `${this.left} ${this.operator} ${this.right}`;
        // let precedence = this.getPrecedence();
        // let text = `${(this.left.toString as any)(precedence)} ${this.operator} ${(this.right.toString as any)(precedence)}`;
        // if (precedence < parentPrecedence) {
        //     text = `(${text})`;
        // }
        // return text;
    }

}