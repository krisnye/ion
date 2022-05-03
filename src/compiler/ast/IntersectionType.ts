import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { BinaryExpression } from "./BinaryExpression";
import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Expression } from "./Expression";
import { Type } from "./Type";

export interface IntersectionTypeProps extends CompoundTypeProps {
}

export class IntersectionType extends CompoundType implements Type {

    constructor(props: IntersectionTypeProps) { super(props); }
    patch(props: Partial<IntersectionTypeProps>) {
        return super.patch(props);
    }

    simplify() {
        return this.simplifyInternal(false);
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        return BinaryExpression.join(TypeOperators.and,
            this.left.toDotExpression(c, dot),
            this.right.toDotExpression(c, dot)
        )
    }

    toString() {
        return `${this.left} & ${this.right}`;
    }

}