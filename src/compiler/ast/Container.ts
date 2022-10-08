import { EvaluationContext } from "../EvaluationContext";
import { SemanticHighlight, SemanticModifier, SemanticTokenType } from "../SemanticHighlight";
import { Token } from "../Token";
import { Expression, ExpressionProps } from "./Expression";
import { Scope } from "./Scope";

export interface ContainerProps extends ExpressionProps {
    openToken?: Token;
    nodes: Expression[];
    closeToken?: Token;
}

export class Container extends Expression implements Scope {

    openToken?: Token;
    nodes!: Expression[];
    closeToken?: Token;

    constructor(props: ContainerProps) { super(props); }
    patch(props: Partial<ContainerProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* this.nodes;
    }

    toString() {
        return Container.toString(this.nodes);
    }

    *getSemanticHighlights(source: string[]): IterableIterator<SemanticHighlight> {
        if (this.openToken) {
            yield this.openToken.location.createSemanticHighlight(source, SemanticTokenType.keyword);
        }
        for (let node of this.nodes) {
            yield* node.getSemanticHighlights(source);
        }
        if (this.closeToken) {
            yield this.closeToken.location.createSemanticHighlight(source, SemanticTokenType.keyword);
        }
    }

    get isScope() {
        return true;
    }

    static toString(nodes, open = "{", close = "}", indent = '    ') {
        if (nodes == null || nodes.length === 0) {
            return `${open}${close}`;
        }
        return (`${open}\n${nodes.join(`\n`).split(`\n`).map(a => indent + a).join(`\n`)}\n${close}`);
    }

}
