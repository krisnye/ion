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
        yield c.getVariable(this);
        if (this.type) {
            yield this.type;
        }
    }

    protected resolveType(c: EvaluationContext): Type | null {
        let variable = c.getVariable(this);
        return variable.type!;
    }

    toInterpreterInstance(c: EvaluationContext) {
        let value = c.getValue(this);
        return value.toInterpreterInstance(c);
    }
    
    toString() {
        return `${Identifier.prototype.toString.call(this)}`;
    }

}