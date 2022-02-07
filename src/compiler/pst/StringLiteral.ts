import { NonFunctionProperties } from "../../types";
import { Literal } from "./Literal";

type Props = NonFunctionProperties<StringLiteral>;

export class StringLiteral extends Literal {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return JSON.stringify(this.value);
    }

}
