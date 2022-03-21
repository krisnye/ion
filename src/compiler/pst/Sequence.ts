import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";
import { Scope } from "../ast/Scope";
import { SourceLocation } from "../SourceLocation";

type Props = NonFunctionProperties<Sequence>;

function merge(left: Node | null, right: Node | null): Node | null {
    if (left == null) {
        return right;
    }
    if (right == null) {
        return left;
    }
    let nodes = new Array<Node>();
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

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    static flatten(...nodes: Array<Node | null>) {
        let flat = new Array<Node>();
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

    static merge(left: Node, right: Node | null): Node
    static merge(left: Node | null, right: Node): Node
    static merge(...nodes: Array<Node | null>): Node | null
    static merge(...nodes: Array<Node | null>): Node | null {
        return nodes.reduce(merge, null);
    }

}
