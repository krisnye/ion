import { NonFunctionProperties } from "../../types";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<Assembly>;

export class Assembly extends Scope {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return `assembly ${ super.toString() }`;
    }

}
