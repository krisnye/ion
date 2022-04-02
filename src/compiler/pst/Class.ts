import { Node } from "../Node";
import { Identifier } from "../ast/Identifier";
import { Scope, ScopeProps } from "../ast/Scope";

export interface PstClassProps extends ScopeProps {
    id: Identifier;
    extends: Node | null;
}

class PstClass extends Scope {

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
