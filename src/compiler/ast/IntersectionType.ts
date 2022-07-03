import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { BinaryExpression } from "./BinaryExpression";
import { Call } from "./Call";
import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Expression } from "./Expression";
import { isType, Type } from "./Type";
import { UnionType } from "./UnionType";

export interface IntersectionTypeProps extends CompoundTypeProps {
}

export class IntersectionType extends CompoundType {

    constructor(props: IntersectionTypeProps) { super(props); }
    patch(props: Partial<IntersectionTypeProps>) {
        return super.patch(props);
    }

    getBasicTypes(c: EvaluationContext) {
        return this.left.getBasicTypes(c) & this.right.getBasicTypes(c);
    }

    get isUnion() { return false; }

    toComparisonType(c: EvaluationContext) {
        let left = c.getComparisonType(this.left);
        let right = c.getComparisonType(this.right);
        if (left instanceof CompoundType) {
            [right, left] = [left, right];
        }
        if (right instanceof CompoundType) {
            let rightLeft = left.merge(right.left, this instanceof UnionType, c);
            let rightRight = left.merge(right.right, this instanceof UnionType, c);
            if (rightLeft && rightRight) {
                let result = right.patch({ left: rightLeft, right: rightRight });
                return result;
            }
        }
        const merged = left.merge(right, false, c);
        if (merged == null) {
            left.merge(right, false, c);
            return this.patch({ left, right });
        }

        return merged;
    }

    static *split(type: Type): Generator<Type> {
        if (type instanceof IntersectionType) {
            yield* IntersectionType.split(type.left);
            yield* IntersectionType.split(type.right);
        }
        else {
            yield type;
        }
    }

    static join(...types: (Type | null)[]): Type | null
    static join(type: Type, ...types: Type[]): Type
    static join(...types: Type[]): Type | null {
        let left = types[0] ?? null;
        for (let i = 1; i < types.length; i++) {
            let right = types[i];
            left = new IntersectionType({
                location: SourceLocation.merge(left.location, right.location),
                left,
                right
            });
        }
        return left;
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