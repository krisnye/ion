import { coreTypes } from "../coreTypes";
import { getValue, GetVariableFunction } from "../phases/createScopeMaps";
import { Identifier, IdentifierProps } from "./Identifier";

export interface ReferenceProps extends IdentifierProps  {
}

export class Reference extends Identifier  {

    constructor(props: ReferenceProps) { super(props); }
    patch(props: Partial<ReferenceProps>) { return super.patch(props); }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        let value = getValue(this, getVariable);
        return value.toInterpreterInstance(getVariable);
    }

}