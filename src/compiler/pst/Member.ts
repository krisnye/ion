import { Expression, ExpressionProps } from "../ast/Expression";

export interface MemberProps extends ExpressionProps {
    object: Expression;
    property: Expression;
    computed: boolean;
}

export class Member extends Expression {

    object!: Expression;
    property!: Expression;
    computed!: boolean;

    constructor(props: MemberProps) { super(props); }
    patch(props: Partial<MemberProps>) { return super.patch(props); }

    toString() {
        return this.computed ? `${this.object}[${this.property}]` : `${this.object}.${this.property}`;
    }

}