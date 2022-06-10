import { Expression } from "./Expression";
import { Identifier } from "./Identifier";
import { isMetaContainer, MetaContainer } from "./MetaContainer";

export interface Declaration extends MetaContainer, Expression {

    id: Identifier;
    value: Expression | null;
    isGlobalScoped?: boolean;

}

export function isDeclaration(node: any): node is Declaration {
    return node?.id != null && isMetaContainer(node);
}
