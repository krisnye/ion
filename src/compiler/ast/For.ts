import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { Block } from "../ast/Block";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { Expression } from "./Expression";
import { ForItem } from "./ForItem";
import { Loop, LoopProps } from "./Loop";
import { Scope } from "./Scope";
import { Variable } from "./Variable";

export interface ForProps extends LoopProps {
    left: Variable;
    right: Expression;
    body: Block;
}

export class For extends Loop implements Scope {

    left!: ForItem;
    right!: Expression;
    body!: Block;
    
    constructor(props: ForProps) { super(props); }
    patch(props: Partial<ForProps>) { return super.patch(props); }
    
    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        let rightValue = this.right.toInterpreterValue(c) as InterpreterInstance;
        if (!rightValue.isArray) {
            throw new Error(`Expected Array: ${rightValue}`);
        }
        let rightArray = rightValue.value as InterpreterInstance[];
        for (let i = 0; i < rightArray.length; i++) {
            let item = rightArray[i];
            // set the left item into scope
            c.setValue(this.left.id.name, item);
            this.body.toInterpreterValue(c);
            if (c.returnValue || c.break) {
                c.break = false;
                return;
            }
        }
    }

    protected areAllDependenciesResolved(c: EvaluationContext) {
        return false;
    }

    get isScope() { return true; }
    get nodes(): Node[] {
        return [this.left, this.right, this.body];
    }

    toString() {
        return `for ${this.left} in ${this.right} ${this.body}`;
    }

}
