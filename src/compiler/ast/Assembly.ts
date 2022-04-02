import { Scope, ScopeProps } from "./Scope";

export interface AssemblyProps extends ScopeProps {
}

export class Assembly extends Scope {

    constructor(props: AssemblyProps) { super(props); }
    patch(props: Partial<AssemblyProps>) { return super.patch(props); }

    toString() {
        return `assembly ${ super.toString() }`;
    }

}
