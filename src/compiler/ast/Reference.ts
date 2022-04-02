import { Identifier, IdentifierProps } from "./Identifier";

export interface ReferenceProps extends IdentifierProps  {
}

export class Reference extends Identifier  {

    constructor(props: ReferenceProps) { super(props); }
    patch(props: Partial<ReferenceProps>) { return super.patch(props); }

}