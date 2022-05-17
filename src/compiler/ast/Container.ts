import { EvaluationContext } from "../EvaluationContext";
import { Expression, ExpressionProps } from "./Expression";
import { Scope } from "./Scope";

export interface ContainerProps extends ExpressionProps {
    nodes: Expression[];
}

export class Container extends Expression implements Scope {

    nodes!: Expression[];

    constructor(props: ContainerProps) { super(props); }
    patch(props: Partial<ContainerProps>) { return super.patch(props); }

    *getDependencies(c: EvaluationContext) {
        yield* this.nodes;
    }

    toString() {
        return Container.toString(this.nodes);
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
