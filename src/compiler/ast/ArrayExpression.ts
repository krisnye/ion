import { NonFunctionProperties } from "../../types";
import { Block } from "./Block";
import { Scope } from "./Scope";

type Props = NonFunctionProperties<ArrayExpression>;

export class ArrayExpression extends Block {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    toString() {
        return Scope.toString(this.nodes, "[", "]");
    }
    
}
