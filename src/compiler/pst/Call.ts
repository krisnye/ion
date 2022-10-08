import { Expression, ExpressionProps } from "../ast/Expression";
import { Token } from "../Token";

export interface CallProps extends ExpressionProps {
    callee: Expression;
    args: Expression | null;
    openToken?: Token;
    closeToken?: Token;
}

export class Call extends Expression {

    callee!: Expression;
    args!: Expression | null;
    openToken?: Token;
    closeToken?: Token;

    constructor(props: CallProps) { super(props); }
    patch(props: Partial<CallProps>) { return super.patch(props); }

    toString() {
        return `${this.callee}(${this.args != null ? this.args : ""})`;
    }

}