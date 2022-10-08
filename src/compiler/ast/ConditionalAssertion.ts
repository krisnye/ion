import { expressionToType, joinExpressions, splitExpression, splitFilterJoinMultiple } from "../analysis/utility";
import { EvaluationContext } from "../EvaluationContext";
import { isLogicalBinaryExpression } from "../phases/frontend/insertConditionalAssignments";
import { Call } from "./Call";
import { Conditional } from "./Conditional";
import { Expression, ExpressionProps } from "./Expression";
import { IntersectionType } from "./IntersectionType";
import { Reference } from "./Reference";
import { Type } from "./Type";

export interface ConditionalAssertionProps extends ExpressionProps {
    value: Reference;
    negate: boolean;
    isChained?: boolean;
}

export class ConditionalAssertion extends Expression {

    value!: Reference;
    negate!: boolean;
    isChained?: boolean;

    constructor(props: ConditionalAssertionProps) { super(props); }
    patch(props: Partial<ConditionalAssertionProps>) { return super.patch(props); }

    getKnownTrueExpression(c: EvaluationContext): Expression {
        if (this.isChained) {
            let parentExpression = c.lookup.findAncestor(this, isLogicalBinaryExpression);
            let { left, right } = parentExpression;
            return left;
        }
        let cond = c.lookup.findAncestor<Conditional>(this, (node): node is Conditional => {
            return node instanceof Conditional;
        })!;
        return cond.test;
    }

    *getDependencies(c: EvaluationContext) {
        yield this.value;
        //  I'm not sure we need to know the type on this before inferring
        yield this.getKnownTrueExpression(c);
    }

    protected resolve(c: EvaluationContext): Expression {
        let type = this.resolveType(c);
        return this.value.patch({ type, resolved: true });
    }

    protected resolveType(c: EvaluationContext) {
        const test = this.getKnownTrueExpression(c);
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
