import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";

export interface ScopeProps extends ExpressionProps {
    nodes: Expression[];
}

export class Scope extends Expression {

    nodes!: Expression[];

    constructor(props: ScopeProps) { super(props); }
    patch(props: Partial<ScopeProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* this.nodes;
    }

    toString() {
        return Scope.toString(this.nodes);
    }

    static toString(nodes, open = "{", close = "}", indent = '    ') {
        if (nodes == null || nodes.length === 0) {
            return `${open}${close}`;
        }
        return (`${open}\n${nodes.join(`\n`).split(`\n`).map(a => indent + a).join(`\n`)}\n${close}`);
    }

}
