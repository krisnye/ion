import { NonFunctionProperties } from "../../types";
import { NumberLiteral } from "./NumberLiteral";

type Props = NonFunctionProperties<NumberLiteral>;

export class IntegerLiteral extends NumberLiteral {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return this.value.toString();
    }

}