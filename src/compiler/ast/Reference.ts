import { InterpreterContext } from "../../interpreter/InterpreterContext";
import { InterpreterInstance } from "../../interpreter/InterpreterInstance";
import { InterpreterValue } from "../../interpreter/InterpreterValue";
import { isValidId } from "../common";
import { EvaluationContext } from "../EvaluationContext";
import { SemanticHighlight, SemanticModifier, SemanticTokenType } from "../SemanticHighlight";
import { isMetaName, isTypeName } from "../utility";
import { Expression, ExpressionProps } from "./Expression";
import { Identifier } from "./Identifier";
import { Type } from "./Type";

export interface ReferenceProps extends ExpressionProps  {

    name: string;

}

export class Reference extends Expression  {

    name!: string;

    constructor(props: ReferenceProps) { super(props); }
    patch(props: Partial<ReferenceProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* c.getDeclarations(this);
        if (this.type) {
            yield this.type;
        }
    }

    protected resolveType(c: EvaluationContext): Type | null {
        let declarations = c.getDeclarations(this);
        // just return the first
        return declarations[0].type!;
    }

    toInterpreterValue(c: InterpreterContext): InterpreterValue | void {
        return c.getValue(this.name);
    }
    
    toString() {
        return `${Identifier.prototype.toString.call(this)}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "Identifier",
            name: this.name,
        }        
    }

    private getSemanticTokenType() {
        if (isMetaName(this.name)) {
            return SemanticTokenType.type;
        }
        if (isTypeName(this.name)) {
            return SemanticTokenType.class;
        }
        if (!isValidId(this.name)) {
            return SemanticTokenType.operator;
        }
        return SemanticTokenType.variable;
    }

    private getSemanticModifiers(): SemanticModifier[] {
        if (isMetaName(this.name)) {
            return [SemanticModifier.modification];
        }
        return [];
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        yield this.location.createSemanticHighlight(
            source,
            this.getSemanticTokenType(),
            ...this.getSemanticModifiers(),
        );
    }

}