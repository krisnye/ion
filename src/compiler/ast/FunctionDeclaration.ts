import { Node } from "../Node";
import { Declaration } from "./Declaration";
import { Declarator } from "./Declarator";
import { Function, FunctionProps } from "./Function";

export interface FunctionDeclarationProps extends FunctionProps {
    id: Declarator
    body: Node;
    inferred?: boolean;
    order?: number;
}

export class FunctionDeclaration extends Function implements Declaration {

    id!: Declarator;
    // function declarations are scoped globally to allow overloading multimethods from anywhere
    isGlobalScoped = true;
    inferred!: boolean;
    isDeclaration: true = true;
    order?: number;
    //  if present, these are the names of the individual functions that makeup this multifunction

    constructor(props: FunctionDeclarationProps) { super({ inferred: false, ...props }); }
    patch(props: Partial<FunctionDeclarationProps>) { return super.patch(props); }

    toString() {
        let value = super.toString();
        return this.order != null ? `(${this.order})${value}` : value;
    }

    get inferredKey() {
        return this.inferred ? `${this.id.name}(${this.parameters.map(p => p.declaredType).join(`,`)})` : null;
    }

    get value() {
        return this;
    }
    set value(value) {
    }

}