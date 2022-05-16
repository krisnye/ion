import { isSubtype } from "../analysis/isSubtype";
import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { Expression, ExpressionProps } from "./Expression";
import { Reference } from "./Reference";

export interface AssignmentProps extends ExpressionProps {
    id: Reference;
    value: Node;
}
export class Assignment extends Expression {

    id!: Reference;
    value!: Expression;

    constructor(props: AssignmentProps) { super(props); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield this.id;
        yield this.value;
    }

    resolveType(c: EvaluationContext) {
        let variable = c.getVariable(this.id);
        variable.ensureAssignmentValid(c, this.value, false);
        return this.value.type
    }

    toString() {
        return `${this.id} = ${this.value}`;
    }

}