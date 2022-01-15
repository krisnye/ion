import { NonFunctionProperties } from "../../types";
import { Expression } from "./Expression";

type Props = NonFunctionProperties<Call>;

export class Call extends Expression {

    callee!: Expression;
    arguments!: Expression[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}