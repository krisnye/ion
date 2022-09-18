import { Declarator } from "./Declarator";
import { Expression } from "./Expression";
import { MetaContainer } from "./MetaContainer";

export interface Declaration extends MetaContainer, Expression {

    id: Declarator;
    value: Expression | null;
    isGlobalScoped?: boolean;
    isDeclaration: true;
    order?: number;

}

export function isDeclaration(node: any): node is Declaration {
    return node != null && node.isDeclaration === true;
}
