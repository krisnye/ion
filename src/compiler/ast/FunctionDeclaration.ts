import { Node } from "../Node";
import { Declaration } from "./Declaration";
import { Function, FunctionProps } from "./Function";
import { Identifier } from "./Identifier";

export interface FunctionDeclarationProps extends FunctionProps {
    id: Identifier
    body: Node;
    inferred?: boolean;
}

export class FunctionDeclaration extends Function implements Declaration {

    id!: Identifier;
    // function declarations are scoped globally to allow overloading multimethods from anywhere
    isGlobalScoped = true;
    inferred!: boolean;

    constructor(props: FunctionDeclarationProps) { super({ inferred: false, ...props }); }
    patch(props: Partial<FunctionDeclarationProps>) { return super.patch(props); }

    get inferredKey() {
        return this.inferred ? `${this.id.name}(${this.parameters.map(p => p.declaredType).join(`,`)})` : null;
    }

    get value() {
        return this;
    }

}