import { Node } from "../Node";
import { Expression } from "./Expression";
import { Identifier } from "./Identifier";
import { isMetaContainer, MetaContainer } from "./MetaContainer";

export interface Declaration extends MetaContainer, Node {

    id: Identifier;
    value: Expression | null;

}

export function isDeclaration(node: any): node is Declaration {
    return node?.id != null && isMetaContainer(node);
}
