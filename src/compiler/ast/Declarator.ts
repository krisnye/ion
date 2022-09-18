import { Identifier, IdentifierProps } from "./Identifier";

export interface DeclaratorProps extends IdentifierProps {
}

export class Declarator extends Identifier {

    //  just used for type enforcement.
    //  because otherwise this class looks the same as Identifier
    isDeclarator = true;

    constructor(props: DeclaratorProps) { super(props); }
    patch(props: Partial<DeclaratorProps>) { return super.patch(props); }

}