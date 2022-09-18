import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { BinaryExpression } from "./BinaryExpression";
import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Expression } from "./Expression";
import { BasicType, isType, Type } from "./Type";

export interface UnionTypeProps extends CompoundTypeProps {
}

export class UnionType extends CompoundType {

    constructor(props: UnionTypeProps) { super(props); }
    patch(props: Partial<UnionTypeProps>) {
        return super.patch(props);
    }

    getBasicTypes(c: EvaluationContext) {
        return this.left.getBasicTypes(c) | this.right.getBasicTypes(c);
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        return BinaryExpression.join(TypeOperators.or,
            this.left.toDotExpression(c, dot),
            this.right.toDotExpression(c, dot)
        )
    }

    static *split(type: Type): Generator<Type> {
        if (type instanceof UnionType) {
            yield* UnionType.split(type.left);
            yield* UnionType.split(type.right);
        }
        else {
            yield type;
        }
    }

    get isUnion() { return true; }

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
                console.log("MERGED: " + result);
                return result;
            }
        }

        let type = this.patch({ left, right }).simplify(c) as Type;
        if (!(type instanceof UnionType)) {
            type = type.toComparisonType?.(c) ?? type;
        }
        return type;
    }

    static join(...types: (Type | null)[]): Type | null
    static join(type: Type, ...types: (Type | null)[]): Type
    static join(...types: Type[]): Type | null {
        let left = types[0] ?? null;
        for (let i = 1; i < types.length; i++) {
            let right = types[i];
            left = left && right ? new UnionType({
                location: SourceLocation.merge(left.location, right.location),
                left,
                right
            }) : (left ?? right);
        }
        return left;
    }

    toString() {
        return `${this.left} | ${this.right}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "BinaryExpression",
            left: this.left.toESNode(c),
            operator: "||",
            right: this.right.toESNode(c)
        };
    }
}