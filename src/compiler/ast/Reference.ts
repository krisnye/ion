import { EvaluationContext } from "../EvaluationContext";
import { Identifier, IdentifierProps } from "./Identifier";
import { Type } from "./Type";

export interface ReferenceProps extends IdentifierProps  {
}

export class Reference extends  Identifier  {

    name!: string;

    constructor(props: ReferenceProps) { super(props); }
    patch(props: Partial<ReferenceProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield c.getVariable(this);
    }

    protected resolveType(c: EvaluationContext): Type | null {
        let variable = c.getVariable(this);
        if (variable.type) {
            return variable.type!;
        }
        return null;
    }

    toInterpreterInstance(c: EvaluationContext) {
        let value = c.getValue(this);
        return value.toInterpreterInstance(c);
    }

}