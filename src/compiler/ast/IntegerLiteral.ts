import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";

export interface IntegerLiteralProps extends NumberLiteralProps {
}

export class IntegerLiteral extends NumberLiteral {

    constructor(props: IntegerLiteralProps) { super(props); }
    patch(props: Partial<IntegerLiteralProps>) { return super.patch(props); }

    toString() {
        let text = this.value.toString();
        return this.type ? `${text} : ${this.type}` : text;
    }

}