import { Node } from "../Node";
import { Identifier } from "../ast/Identifier";
import { Container, ContainerProps } from "../ast/Container";

export interface PstClassProps extends ContainerProps {
    id: Identifier;
    extends: Node | null;
}

class PstClass extends Container {

    id!: Identifier;
    extends!: Node | null;

    constructor(props: PstClassProps) { super(props); }
    patch(props: Partial<PstClassProps>) { return super.patch(props); }

    toString() {
        let ex = this.extends?.toString() ?? "";
        return `class ${this.id}${ex.length > 0 ? " extends " + ex : ""} ${ super.toString() }`;
    }

}

export const Class = PstClass;
