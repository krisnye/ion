import { Identifier } from "../ast/Identifier";
import { Scope, ScopeProps } from "./Scope";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { checkParameters, MetaCall } from "./Call";
import { metaToString } from "./MetaContainer";
import { Node } from "../Node";
import { Instance } from "./Instance";
import { Reference } from "./Reference";
import { Call } from "../ast/Call";
import { GetVariableFunction } from "../phases/createScopeMaps";

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

    evaluate(call: Call, getVariable: GetVariableFunction): Instance | Error[] {
        let properties = checkParameters(this, this.nodes, call.nodes, getVariable);
        if (properties[0] instanceof Error) {
            return properties as Error[];
        }
        // not sure this needs to exist.
        return new Instance({
            location: call.location,
            class: call.callee as Reference,
            nodes: properties as Node[],
        })
    }

    toString() {
        return `${metaToString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Scope.toString([...this.meta, ...this.nodes]) }`;
    }

}