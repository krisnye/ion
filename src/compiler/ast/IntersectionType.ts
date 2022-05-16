import { TypeOperators } from "../analysis/TypeOperators";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticError } from "../SemanticError";
import { SourceLocation } from "../SourceLocation";
import { BinaryExpression } from "./BinaryExpression";
import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Expression } from "./Expression";
import { Type } from "./Type";

export interface IntersectionTypeProps extends CompoundTypeProps {
}

export class IntersectionType extends CompoundType {

    constructor(props: IntersectionTypeProps) { super(props); }
    patch(props: Partial<IntersectionTypeProps>) {
        return super.patch(props);
    }

    simplify() {
        return this.simplifyInternal(false);
    }

    getBasicTypes(c: EvaluationContext) {
        return this.left.getBasicTypes(c) & this.right.getBasicTypes(c);
    }

    toComparisonType(c: EvaluationContext) {
        const left = c.getComparisonType(this.left);
        const right = c.getComparisonType(this.right);
        const merged = left.merge(right, false, c);
        if (merged == null) {
            throw new SemanticError(`Types are incompatible`, this.left, this.right);
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

    static join(...types: Type[]): Type | null
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