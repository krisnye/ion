import { Block } from "../ast/Block"
import { Conditional } from "../ast/Conditional";
import { Expression } from "../ast/Expression"
import { Return } from "../ast/Return";

export default function *getFinalExpressions(node: Expression): Generator<Expression> {
    if (node instanceof Block) {
        let last = node.nodes[node.nodes.length - 1];
        if (last) {
            yield* getFinalExpressions(last);
        }
    }
    else if (node instanceof Conditional) {
        yield* getFinalExpressions(node.consequent)
        if (node.alternate) {
            yield* getFinalExpressions(node.alternate)
        }
    }
    else {
        if (node instanceof Return) {
            node = node.value;
        }
        yield node
    }
}