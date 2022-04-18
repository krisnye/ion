import { EvaluationContext } from "./EvaluationContext";
import { Immutable } from "./Immutable";
import { SourceLocation } from "./SourceLocation";

export interface NodeProps {
    location: SourceLocation;
}

export class Node extends Immutable implements Required<NodeProps> {

    location!: SourceLocation;

    constructor(props) {
        super(props);
    }

    simplify(): Node {
        return this;
    }

    toInterpreterInstance(c: EvaluationContext): any {
        throw new Error(`${this.constructor.name}.toInterpreterInstance not implemented.`);
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            location: void 0,
        };
    }

}