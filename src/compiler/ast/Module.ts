import { Scope, ScopeProps } from "./Scope";

export interface ModuleProps extends ScopeProps {
    name: string;
    dependencies: string[];
}

export class Module extends Scope {

    name!: string;

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    toString() {
        return `module ${this.name} ${ super.toString() }`;
    }

}
