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

    simplify() {
        return this.simplifyInternal(true);
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

    toComparisonType(c: EvaluationContext) {
        const left = c.getComparisonType(this.left);
        const right = c.getComparisonType(this.right);
        return this.patch({ left, right });
    }

    static join(...types: Type[]): Type | null
    static join(type: Type, ...types: Type[]): Type
    static join(...types: Type[]): Type | null {
        let left = types[0] ?? null;
        for (let i = 1; i < types.length; i++) {
            let right = types[i];
            left = new UnionType({
                location: SourceLocation.merge(left.location, right.location),
                left,
                right
            });
        }
        return left;
    }

    toString() {
        return `${this.left} | ${this.right}`;
    }

}