import { NonFunctionProperties } from "../../types";
import { Identifier } from "./Identifier";

type Props = NonFunctionProperties<Reference>;

export class Reference extends Identifier {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}