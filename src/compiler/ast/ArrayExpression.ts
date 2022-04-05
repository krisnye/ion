import { Block, BlockProps } from "./Block";
import { Scope } from "./Scope";

export interface ArrayExpressionProps extends BlockProps {
}

export class ArrayExpression extends Block {

    constructor(props: ArrayExpressionProps) { super(props); }
    patch(props: Partial<ArrayExpressionProps>) { return super.patch(props); }

    toString() {
        return Scope.toString(this.nodes, "[", "]");
    }
    
}
