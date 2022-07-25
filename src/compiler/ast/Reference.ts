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

    toInterpreterInstance(c: EvaluationContext) {
        let value = c.getValue(this);
        return value.toInterpreterInstance(c);
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