import { EvaluationContext } from "./EvaluationContext";
import { Immutable } from "./Immutable";
import { SourceLocation } from "./SourceLocation";

export interface NodeProps {
    filename?: string;
    location: SourceLocation;
}

export class Node extends Immutable implements NodeProps {

    filename?: string;
    location!: SourceLocation;

    constructor(props) {
        super(props);
    }

    getFilename() {
        return this.filename ?? this.location.filename;
    }

    simplify(c?: EvaluationContext): Node {
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

    toESNode(c: EvaluationContext): any {
        return {
            type: "ExpressionStatement",
            expression: {
                type: "Literal",
                value: `${this.constructor.name}.toESNode() not implemented`
            }
        }
    }

}