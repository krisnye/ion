import { Scope, ScopeProps } from "./Scope";

export interface BlockProps extends ScopeProps {

}

export class Block extends Scope {

    constructor(props: ScopeProps) { super(props); }
    patch(props: Partial<ScopeProps>) { return super.patch(props); }
    
}
