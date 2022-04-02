import { Scope, ScopeProps } from "../ast/Scope";

export interface ModuleProps extends ScopeProps {
    name: string;
    dependencies: string[];
}

export class Module extends Scope {

    name!: string;
    dependencies!: string[];

    constructor(props: ModuleProps) { super(props); }
    patch(props: Partial<ModuleProps>) { return super.patch(props); }

    toString() {
        if (this.dependencies.length > 0) {
            return `module ${this.name} ${ super.toString() }\n// externals: ${this.dependencies}`;
        }
        else {
            return `module ${this.name} ${ super.toString() }`;
        }
    }

}
