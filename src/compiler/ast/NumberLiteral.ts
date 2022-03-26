import { NonFunctionProperties } from "../../types";
import { Literal } from "./Literal";

type Props = NonFunctionProperties<NumberLiteral>;

export class NumberLiteral extends Literal {

    value!: number;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        let text = this.value.toString();
        return text.indexOf('.') < 0 ? this.value.toFixed(1) : text;
    }

}