import { Scope, ScopeProps } from "../ast/Scope";
import { SourceLocation } from "../SourceLocation";
import { Expression } from "../ast/Expression";

export interface SequenceProps extends ScopeProps {
}

function merge(left: Expression | null, right: Expression | null): Expression | null {
    if (left == null) {
        return right;
    }
    if (right == null) {
        return left;
    }
    let nodes = new Array<Expression>();
    if (left instanceof Sequence) {
        nodes.push(...left.nodes);
    }
    else {
        nodes.push(left);
    }
    if (right instanceof Sequence) {
        nodes.push(...right.nodes);
    }
    else {
        nodes.push(right);
    }
    return new Sequence({
        location: SourceLocation.merge(left.location, right.location),
        nodes
    })
}

//  A group of nodes the type of which is the sequence of all nodes types
export class Sequence extends Scope {

    constructor(props: SequenceProps) { super(props); }
    patch(props: Partial<SequenceProps>) { return super.patch(props); }

    static flatten(...nodes: Array<Expression | null>) {
        let flat = new Array<Expression>();
        for (let node of nodes) {
            if (node instanceof Sequence) {
                flat.push(...node.nodes);
            }
            else if (node != null) {
                flat.push(node);
            }
        }
        return flat;
    }

    static merge(left: Expression, right: Expression | null): Expression
    static merge(left: Expression | null, right: Expression): Expression
    static merge(...nodes: Array<Expression | null>): Expression | null
    static merge(...nodes: Array<Expression | null>): Expression | null {
        return nodes.reduce(merge, null);
    }

}
