import { isValidId } from "../common";
import { EvaluationContext } from "../EvaluationContext";
import { Node, NodeProps } from "../Node";
import { SemanticHighlight, SemanticTokenType } from "../SemanticHighlight";

export interface IdentifierProps extends NodeProps {
    name: string;
}

export class Identifier extends Node {

    name!: string;

    constructor(props: IdentifierProps) { super(props); }
    patch(props: Partial<IdentifierProps>) { return super.patch(props); }

    toString() {
        return `${isValidId(this.name) ? this.name : `\`${this.name}\``}`;
    }

    toESNode(c: EvaluationContext) {
        return {
            type: "Identifier",
            name: this.name,
        }        
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        // yield this.location.createSemanticHighlight(source, isValidId(this.name) ? SemanticTokenType.variable : SemanticTokenType.operator);
    }


}