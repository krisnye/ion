import { toMetaString } from "./MetaContainer";
import { isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { isSubtype } from "../analysis/isSubtype";
import { SemanticError } from "../SemanticError";
import { Variable, VariableProps } from "./Variable";
import { For } from "./For";
import { Type } from "./Type";
import { IntersectionType } from "./IntersectionType";
import { ObjectType } from "./ObjectType";
import { Identifier } from "./Identifier";
import { UnionType } from "./UnionType";

export interface ForItemProps extends VariableProps {
}

export class ForItem extends Variable {

    *getDependencies(c: EvaluationContext) {
        let parent = c.lookup.getAncestor(this) as For;
        yield parent.right;
    }

    resolveType(c: EvaluationContext) {
        let { right } = c.lookup.getAncestor(this) as For;
        return getItemType(c, right.type!);
    }

}

export function getItemType(c: EvaluationContext, collectionType: Type): Type {
    let type = c.getComparisonType(collectionType);
    let objectType = [...IntersectionType.split(type)].find(node => node instanceof ObjectType) as ObjectType;
    if (objectType == null) {
        throw new SemanticError(`Expected a collection type`, type);
    }
    let nonIdProps = objectType.properties.filter(node => !(node.key instanceof Identifier));
    let nonIdTypes = nonIdProps.map(node => node.value);
    return UnionType.join(...nonIdTypes)!;
}