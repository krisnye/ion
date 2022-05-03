import { EvaluationContext } from "../EvaluationContext";
import { Scope, ScopeProps } from "./Scope";
import { VoidType } from "./VoidType";

export interface ModuleProps extends ScopeProps {
    name: string;
    dependencies: string[];
}

export class Module extends Scope {

    name!: string;

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    protected resolveType(c: EvaluationContext) {
        return new VoidType({ location: this.location });
    }

    toString() {
        return `module ${this.name} ${ super.toString() }`;
    }

}
