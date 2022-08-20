import { Expression } from "./Expression";
import { Identifier } from "./Identifier";
import { MetaContainer } from "./MetaContainer";

export interface Declaration extends MetaContainer, Expression {

    id: Identifier;
    value: Expression | null;
    isGlobalScoped?: boolean;
    isDeclaration: true;
    order?: number;

}

export function isDeclaration(node: any): node is Declaration {
    return node.isDeclaration === true;
}
