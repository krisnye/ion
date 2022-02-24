import { NonFunctionProperties } from "../../types";
import { Scope } from "../ast/Scope";

type Props = NonFunctionProperties<Block>;

export class Block extends Scope {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }
    
}
