import { Node } from "../Node";
import { Container, ContainerProps } from "../ast/Container";
import { Declarator } from "../ast/Declarator";
import { Token } from "../Token";

export interface PstClassProps extends ContainerProps {
    id: Declarator;
    extends: Node | null;
    classToken?: Token;
    extendsToken?: Token;
}

class PstClass extends Container {

    id!: Declarator;
    extends!: Node | null;
    classToken?: Token;
    extendsToken?: Token;

    constructor(props: PstClassProps) { super(props); }
    patch(props: Partial<PstClassProps>) { return super.patch(props); }

    toString() {
        let ex = this.extends?.toString() ?? "";
        return `class ${this.id}${ex.length > 0 ? " extends " + ex : ""} ${ super.toString() }`;
    }

}

export const Class = PstClass;
