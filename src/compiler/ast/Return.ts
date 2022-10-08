import { Expression, ExpressionProps } from "./Expression";
import { EvaluationContext } from "../EvaluationContext";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { Token } from "../Token";
import { SemanticHighlight, SemanticTokenType } from "../SemanticHighlight";

export interface ReturnProps extends ExpressionProps {
    returnToken?: Token;
    value: Expression;
}

export class Return extends Expression {

    returnToken?: Token;
    value!: Expression;

    constructor(props: ReturnProps) { super(props); }

    patch(props: Partial<ReturnProps>) {
        return super.patch(props);
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        c.returnValue = this.value.toInterpreterValue(c)!;
    }

    toString() {
        return `return ${this.value}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "ReturnStatement",
            argument: this.value.toESNode(c)
        }
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        if (this.returnToken) {
            yield this.returnToken.location.createSemanticHighlight(source, SemanticTokenType.keyword);
        }
    }
    
}
