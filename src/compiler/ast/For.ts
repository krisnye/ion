import { Block } from "../ast/Block";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { ForItem } from "./ForItem";
import { Scope } from "./Scope";
import { Variable } from "./Variable";

export interface ForProps extends ExpressionProps {
    left: Variable;
    right: Expression;
    body: Block;
}

export class For extends Expression implements Scope {

    left!: ForItem;
    right!: Expression;
    body!: Block;
    
    constructor(props: ForProps) { super(props); }
    patch(props: Partial<ForProps>) { return super.patch(props); }
    
    protected areAllDependenciesResolved(c: EvaluationContext) {
        return false;
    }
    
    get isScope() { return true; }

    toString() {
        return `for ${this.left} in ${this.right} ${this.body}`;
    }

}