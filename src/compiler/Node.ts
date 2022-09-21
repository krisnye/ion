import { InterpreterContext } from "../interpreter/InterpreterContext";
import { InterpreterValue } from "../interpreter/InterpreterValue";
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

    toJSON(): any {
        return {
            ...super.toJSON(),
            location: void 0,
        };
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        throw new Error(`${this.constructor.name}.toInterpreterValue not implemented.`);
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