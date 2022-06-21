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

    abstract get isUnion(): boolean;
    abstract toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression;

    *getDependencies(c: EvaluationContext): Generator<Expression> {
        yield this.left;
        yield this.right;
    }

    protected resolve(c: EvaluationContext): Expression {
        let resolved = super.resolve(c);
        return resolved.simplify(c) as Type;
    }

    simplify(c?: EvaluationContext) {
        let left = this.left.simplify(c) as Type;
        let right = this.right.simplify(c) as Type;
        if (left.toString() === right.toString()) {
            return left;
        }
        if (isType(left) && isType(right)) {
            if (left instanceof CompoundType) {
                [right, left] = [left, right];
            }
            if (right instanceof CompoundType) {
                let rightLeft = left.merge(right.left, this.isUnion, c);
                let rightRight = left.merge(right.right, this.isUnion, c);
                if (rightLeft && rightRight) {
                    let result = right.patch({ left: rightLeft, right: rightRight });
                    return result;
                }
                if (rightLeft) {
                    // merged with right.left, so use that and retain right.right
                    return this.patch({ left: rightLeft, right: right.right });
                }
                if (rightRight) {
                    // merged with right.right, so use that and retain right.left
                    return this.patch({ left: right.left, right: rightRight });
                }
            }
    
            const combined = left.merge(right, this.isUnion);
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