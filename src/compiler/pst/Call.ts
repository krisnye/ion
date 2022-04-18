import { Expression, ExpressionProps } from "../ast/Expression";

export interface CallProps extends ExpressionProps {
    callee: Expression;
    args: Expression | null;
}

export class Call extends Expression {

    callee!: Expression;
    args!: Expression | null;

    constructor(props: CallProps) { super(props); }
    patch(props: Partial<CallProps>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.args != null ? this.args : ""})`;
    }

}