import { Immutable } from "./Immutable";
import { GetVariableFunction } from "./phases/createScopeMaps";
import { SourceLocation } from "./SourceLocation";

export interface NodeProps {
    location: SourceLocation;
    type?: null | Node;
    constant?: null | boolean;
}

export class Node extends Immutable implements Required<NodeProps> {

    location!: SourceLocation;
    type!: null | Node;
    constant!: null | boolean;

    constructor(props) {
        super({ type: null, constant: null, ...props });
    }

    toInterpreterInstance(getVariable: GetVariableFunction) {
        throw new Error(`${this.constructor.name}.toInterpreterInstance not implemented.`);
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            location: void 0,
            type: this.type ?? void 0,          //  prevent type from being written if null
            constant: this.constant ?? void 0   //  prevent constant from being written if null
        };
    }

}