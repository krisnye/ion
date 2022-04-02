import { Immutable } from "./Immutable";
import { SourceLocation } from "./SourceLocation";

export interface NodeProps {
    location: SourceLocation
    type?: Node | null
}

export class Node extends Immutable implements Required<NodeProps> {

    location!: SourceLocation;
    type!: Node | null;

    constructor(props) {
        super({ type: null, ...props });
    }

    toJSON(): any {
        return { ...super.toJSON(), location: void 0 }
    }

}