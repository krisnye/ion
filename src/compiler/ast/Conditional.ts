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

    toString() {
        if (this.alternate != null) {
            return `if (${this.test}) ${this.consequent} else ${this.alternate}`
        }
        else {
            return `if (${this.test}) ${this.consequent}`
        }
    }

}