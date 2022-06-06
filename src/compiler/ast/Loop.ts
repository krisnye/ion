import { Block } from "./Block";
import { Expression, ExpressionProps } from "./Expression";

export interface LoopProps extends ExpressionProps {
    body: Block;
}

export class Loop extends Expression {

    body!: Block;
    
    constructor(props: LoopProps) { super(props); }
    patch(props: Partial<LoopProps>) { return super.patch(props); }

}
