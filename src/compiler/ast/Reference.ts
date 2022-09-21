import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { Type } from "./Type";

export interface ReferenceProps extends ExpressionProps  {

    name: string;

}

export class Reference extends Expression  {

    name!: string;

    constructor(props: ReferenceProps) { super(props); }
    patch(props: Partial<ReferenceProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* c.getDeclarations(this);
        if (this.type) {
            yield this.type;
        }
    }

    protected resolveType(c: EvaluationContext): Type | null {
        let declarations = c.getDeclarations(this);
        // just return the first
        return declarations[0].type!;
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        return c.getValue(this.name);
    }
    
    toString() {
        return `${Identifier.prototype.toString.call(this)}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "Identifier",
            name: this.name,
        }        
    }

}