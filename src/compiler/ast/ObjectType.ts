import { BasicType, isType, Type } from "./Type";
import { Identifier } from "./Identifier";
import { Pair } from "./Pair";
import { BinaryExpression } from "./BinaryExpression";
import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { TypeOperators } from "../analysis/TypeOperators";
import { Member } from "./Member";
import { BaseType } from "./BaseType";
import { isSubtype } from "../analysis/isSubtype";
import { SemanticError } from "../SemanticError";
import { IntersectionType } from "./IntersectionType";
import { UnionType } from "./UnionType";

export type SimpleObjectType = ObjectType & { types: [] };

export interface ObjectTypeProps extends ExpressionProps {
    properties: Pair<Type|Identifier,Type>[];
}

export class ObjectType extends BaseType {

    properties!: Pair<Type|Identifier,Type>[];

    private quickLookup: Map<string, Pair<Type|Identifier,Type>>;

    constructor(props: ObjectTypeProps) {
        super(props);
        this.quickLookup = new Map(this.properties.map(p => [p.key.toString(), p]) ?? []);
    }
    patch(props: Partial<ObjectTypeProps>) {
        return super.patch(props);
    }

    getBasicTypes() {
        return BasicType.Object;
    }

    merge(b: Type, union: boolean, c?: EvaluationContext) {
        if (b instanceof ObjectType && c != null) {
            return ObjectType.combine(this, b, union, c);
        }
        return null;
    }

    private static combine(a: ObjectType, b: ObjectType, union: boolean, c: EvaluationContext) {
        if (b instanceof ObjectType) {
            const mergedPairs = new Map(a.quickLookup.entries());
            for (const bPair of b.properties) {
                const aPair = a.getPropertyPair(bPair.key, c);
                if (aPair != null) {
                    // make sure they combine.
                    let aType = aPair.value;
                    let bType = bPair.value;
                    if (!union) {
                        if (isSubtype(aType, bType, c) === false) {
                            throw new SemanticError(`Property ${aPair.key} on types is incompatible`, a, b);
                        }
                    }
                    mergedPairs.set(bPair.key.toString(), aPair.patch({
                        value: c.getComparisonType(
                            union
                            ? new UnionType({ location: aPair.value.location, left: aType, right: bType })
                            : new IntersectionType({ location: aPair.value.location, left: aType, right: bType })
                        )
                    }));
                }
                else {
                    mergedPairs.set(bPair.key.toString(), bPair);
                }
            }
            return a.patch({ properties: [...mergedPairs.values()]});
        }
        return null;
    }

    private getPairs() {
        return [...this.properties.values()];
    }

    toString() {
        return `(${this.getPairs().map(({ key, value }) => `${key} : ${value}`).join(", ")})`;
    }

    toDotExpression(c: EvaluationContext, dot: Expression): BinaryExpression {
        return BinaryExpression.join(TypeOperators.and,
            ...this.getPairs().map(pair => new BinaryExpression({
                location: pair.location,
                left: new Member({
                    location: pair.location,
                    object: dot,
                    property: pair.key
                }),
                operator: TypeOperators.is,
                right: pair.value
            }))
        );
    }

    getPropertyType(propertyKey: Type | Identifier, c: EvaluationContext) {
        return this.getPropertyPair(propertyKey, c)?.value ?? null;
    }

    getPropertyPair(propertyKey: Type | Identifier, c: EvaluationContext) {
        let quickResult = this.quickLookup.get(propertyKey.toString());
        if (quickResult != null) {
            return quickResult;
        }
        if (propertyKey instanceof Identifier) {
            for (let property of this.properties.values()) {
                if (property.key instanceof Identifier && property.key.name === propertyKey.name) {
                    return property;
                }
            }
        }
        else {
            for (let property of this.properties.values()) {
                if (isType(property.key) && isSubtype(propertyKey, property.key, c)) {
                    return property;
                }
            }
        }
        return null; 
    }

}