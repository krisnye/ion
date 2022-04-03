import { NumberLiteral, NumberLiteralProps } from "./NumberLiteral";

export interface FloatLiteralProps extends NumberLiteralProps {
}

export class FloatLiteral extends NumberLiteral {

    constructor(props: FloatLiteralProps) { super(props); }
    patch(props: Partial<FloatLiteralProps>) { return super.patch(props); }

    toString() {
        let text = this.value.toString();
        text = text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
        return this.type ? `${text} : ${this.type}` : text;
    }

}