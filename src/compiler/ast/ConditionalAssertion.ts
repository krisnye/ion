import { expressionToType, joinExpressions, splitExpression, splitFilterJoinMultiple } from "../analysis/utility";
import { EvaluationContext } from "../EvaluationContext";
import { Call } from "./Call";
import { Conditional } from "./Conditional";
import { Expression, ExpressionProps } from "./Expression";
import { IntersectionType } from "./IntersectionType";
import { Reference } from "./Reference";
import { Type } from "./Type";

export interface ConditionalAssertionProps extends ExpressionProps {
    value: Reference;
    negate: boolean;
}

export class ConditionalAssertion extends Expression {

    value!: Reference;
    negate!: boolean;

    constructor(props: ConditionalAssertionProps) { super(props); }
    patch(props: Partial<ConditionalAssertionProps>) { return super.patch(props); }

    getConditional(c: EvaluationContext) {
        return c.lookup.findAncestor<Conditional>(this, (node): node is Conditional => node instanceof Conditional);
    }

    *getDependencies(c: EvaluationContext) {
        yield this.value;
        yield this.getConditional(c)!.test;
    }

    protected resolve(c: EvaluationContext): Expression {
        let type = this.resolveType(c);
        return this.value.patch({ type, resolved: true });
    }

    protected resolveType(c: EvaluationContext) {
        const test = this.getConditional(c)!.test;
        let splitOps = ["||", "&&"];
        let joinOps = splitOps.slice(0);
        if (this.negate) {
            joinOps.reverse();
        }
        let { type } = this.value;
        let assertedType = splitFilterJoinMultiple(true, test, splitOps, joinOps, e => expressionToType(e, this.value, this.negate)) as Type | null;
        if (assertedType) {
            if (assertedType instanceof Call) {
                splitFilterJoinMultiple(true, test, splitOps, joinOps, e => expressionToType(e, this.value, this.negate)) as Type | null;
            }
            // if this conditional lets us assert a more specific type then we add it.
            type = IntersectionType.join(type, assertedType)?.simplify(c) as Type;
        }
        return type;
    }

    toString() {
        return `cond ${this.negate ? `!` : ``}${this.value}`;
    }

}
