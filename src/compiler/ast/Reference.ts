import { NonFunctionProperties } from "../../types";
import { Expression } from "./Expression";

type Props = NonFunctionProperties<Reference>;

export class Reference extends Expression {

    name!: string;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}