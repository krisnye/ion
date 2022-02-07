import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { infixPrecedence } from "../parser/operators";
import { Token } from "../Token";
import { Identifier } from "./Identifier";

type Props = NonFunctionProperties<BinaryOperation>;
export class BinaryOperation extends Node {

    left!: Node;
    operator!: Token;
    right!: Node;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

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