import { Identifier } from "./Identifier";
import { isMetaContainer, MetaContainer } from "./MetaContainer";

export interface Declaration extends MetaContainer {

    id: Identifier;

}

export function isDeclaration(node: any): node is Declaration {
    return node?.id != null && isMetaContainer(node);
}
