import { EvaluationContext } from "../EvaluationContext";
import { Node } from "../Node";
import { BaseType, BaseTypeProps } from "./BaseType";
import { BinaryExpression } from "./BinaryExpression";
import { Expression, ExpressionProps } from "./Expression";
import { isType, Type } from "./Type";

export interface CompoundTypeProps extends BaseTypeProps {
    left: Node;
    right: Node;
}

export abstract class CompoundType extends BaseType {

    left!: Type;
    right!: Type;

    constructor(props: CompoundTypeProps) { super(props); }
    patch(props: Partial<CompoundTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type) {
        return null;
    }

    abstract toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression;

    protected simplifyInternal(union: boolean) {
        let left = this.left.simplify();
        let right = this.right.simplify();
        if (left.toString() === right.toString()) {
            return left;
        }
        if (isType(left) && isType(right)) {
            const combined = left.merge(right, union);
            if (combined != null) {
                return combined;
            }
        }
        if (left != this.left || right != this.right) {
            return this.patch({ left, right });
        }
        return this;
    }

    toString() {
        return `${this.left} & ${this.right}`;
    }

}