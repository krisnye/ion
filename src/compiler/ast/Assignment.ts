import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { SemanticError } from "../SemanticError";
import { Expression, ExpressionProps } from "./Expression";
import { Reference } from "./Reference";
import { Type } from "./Type";

export interface AssignmentProps extends ExpressionProps {
    id: Reference;
    value: Node;
    conditional?: boolean;
}
export class Assignment extends Expression {

    id!: Reference;
    value!: Expression;
    conditional!: boolean;

    constructor(props: AssignmentProps) { super({ conditional: false, ...props }); }
    patch(props: Partial<AssignmentProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield this.id;
        yield this.value;
    }

    resolveType(c: EvaluationContext): Type | null {
        // SSA Form means this Assignment Expression will NOT exist at type inference phase.
        throw new SemanticError(`Assignment shouldn't exist`, this);
        // let variable = c.getVariable(this.id);
        // variable.ensureAssignmentValid(c, this.value, false);
        // return this.value.type
    }

    toString() {
        return `${this.id} = ${this.value}`;
    }

}