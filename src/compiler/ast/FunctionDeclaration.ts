import { Node } from "../Node";
import { Declaration } from "./Declaration";
import { Function, FunctionProps } from "./Function";
import { Identifier } from "./Identifier";

export interface FunctionDeclarationProps extends FunctionProps {
    id: Identifier
    body: Node;
}

export class FunctionDeclaration extends Function implements Declaration {

    id!: Identifier;

    constructor(props: FunctionProps) { super(props); }
    patch(props: Partial<FunctionProps>) { return super.patch(props); }

    get value() {
        return this;
    }

}