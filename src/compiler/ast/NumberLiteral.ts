import { Literal, LiteralProps } from "./Literal";

export interface NumberLiteralProps extends LiteralProps {
    value: number;
}

export class NumberLiteral extends Literal {

    value!: number;

    constructor(props: NumberLiteralProps) { super(props); }
    patch(props: Partial<NumberLiteralProps>) { return super.patch(props); }

}