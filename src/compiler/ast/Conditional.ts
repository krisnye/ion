import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";

export interface ConditionalProps extends ExpressionProps {
    test: Expression;
    consequent: Expression;
    alternate: Expression | null;
}

export class Conditional extends Expression {

    test!: Expression;
    consequent!: Expression;
    alternate!: Expression | null;

    constructor(props: ConditionalProps) { super(props); }
    patch(props: Partial<ConditionalProps>) { return super.patch(props); }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        let test = this.test.toInterpreterValue(c)!;
        if (c.isTrue(test)) {
            return this.consequent.toInterpreterValue(c);
        } else if (this.alternate) {
            return this.alternate.toInterpreterValue(c);
        }
    }

    toString() {
        if (this.alternate != null) {
            return `if (${this.test}) ${this.consequent} else ${this.alternate}`
        }
        else {
            return `if (${this.test}) ${this.consequent}`
        }
    }

    toESNode(c: EvaluationContext) {
        let { alternate } = this;
        //  remove solo blocks on alternate.
        // while (alternate
        //     && alternate instanceof Block
        //     && alternate.constructor === Block as any
        //     && alternate.nodes.length === 1
        // ) {
        //     alternate = alternate.nodes[0];
        // }
        // //  add 1 back unless Conditional or already Block
        // if (alternate && !(alternate instanceof Conditional || alternate instanceof Block)) {
        //     alternate = new Block({ location: alternate.location, nodes: [alternate] });
        // }
        return {
            type: "IfStatement",
            test: this.test.toESNode(c),
            consequent: this.consequent.toESNode(c),
            alternate: alternate?.toESNode(c)
        }
    }

}