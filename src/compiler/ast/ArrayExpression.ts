import { Block, BlockProps } from "./Block";
import { Scope } from "./Scope";

export interface ArrayProps extends BlockProps {
}

export class ArrayExpression extends Block {

    constructor(props: ArrayProps) { super(props); }
    patch(props: Partial<ArrayProps>) { return super.patch(props); }

    toString() {
        return Scope.toString(this.nodes, "[", "]");
    }
    
}
