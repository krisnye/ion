import { Identifier } from "../ast/Identifier";
import { Scope, ScopeProps } from "./Scope";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { MetaCall } from "./Call";
import { metaToString } from "./MetaContainer";
import { Node } from "../Node";

export interface ClassProps extends ScopeProps {
    id: Identifier;
    extends: Node[];
    nodes: Variable[];
    meta: MetaCall[];
}

export class Class extends Scope implements Declaration {

    id!: Identifier;
    extends!: Node[];
    nodes!: Variable[];
    meta!: MetaCall[];

    constructor(props: ClassProps) { super(props); }
    patch(props: Partial<ClassProps>) { return super.patch(props); }

    toString() {
        return `${metaToString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Scope.toString([...this.meta, ...this.nodes]) }`;
    }

}