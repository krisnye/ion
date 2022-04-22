import { Identifier } from "../ast/Identifier";
import { Scope, ScopeProps } from "./Scope";
import { Variable } from "./Variable";
import { Declaration } from "./Declaration";
import { MetaCall } from "./Call";
import { toMetaString } from "./MetaContainer";
import { Node } from "../Node";
import { Callable } from "./Callable";
import { Type } from "./Type";
import { TypeReference } from "./TypeReference";
import { EvaluationContext } from "../EvaluationContext";
import { FunctionType } from "./FunctionType";

export interface ClassProps extends ScopeProps {
    id: Identifier;
    extends: Node[];
    nodes: Variable[];
    meta: MetaCall[];
}

export class Class extends Scope implements Declaration, Callable {

    id!: Identifier;
    extends!: Node[];
    nodes!: Variable[];
    meta!: MetaCall[];

    constructor(props: ClassProps) { super(props); }
    patch(props: Partial<ClassProps>) { return super.patch(props); }

    call(args: Node[]): Node {
        throw new Error();
    }

    getReturnType(args: Type[]): Type {
        return new TypeReference(this.id);
    }

    protected resolveType(c: EvaluationContext): Type | null {
        const { location } = this;
        // Function Type
        return new FunctionType({
            location,
            meta: [],
            parameters: this.nodes,
            returnType: new TypeReference({ ...this.id, resolved: true }),
            resolved: true,
        })
    }

    // evaluate(call: Call, c: EvaluationContext): Instance | Error[] {
    //     let properties = checkParameters(this, this.nodes, call.nodes, c);
    //     if (properties[0] instanceof Error) {
    //         return properties as Error[];
    //     }
    //     // not sure this needs to exist.
    //     return new Instance({
    //         location: call.location,
    //         class: call.callee as Reference,
    //         nodes: properties as Expression[],
    //     })
    // }

    toString() {
        return `${toMetaString(this)}class ${this.id}${this.extends.length > 0 ? " extends " + this.extends : ""} ${ Scope.toString([...this.meta, ...this.nodes]) }`;
    }

}