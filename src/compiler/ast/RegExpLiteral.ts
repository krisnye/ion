import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { coreTypes } from "../coreTypes";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticHighlight, SemanticTokenType } from "../SemanticHighlight";
import { Literal, LiteralProps } from "./Literal";
import { TypeReference } from "./TypeReference";

export interface RegExpLiteralProps extends LiteralProps {
    value: RegExp;
}

export class RegExpLiteral extends Literal {

    constructor(props: RegExpLiteralProps) { super(props); }
    patch(props: Partial<RegExpLiteralProps>) { return super.patch(props); }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        return new InterpreterInstance(this.value);
    }

    resolveType(c: EvaluationContext) {
        return new TypeReference({ location: this.location, name: coreTypes.RegExp });
    }

    toString() {
        return `${this.value}`;
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        yield this.location.createSemanticHighlight(source, SemanticTokenType.regexp);
    }

}
