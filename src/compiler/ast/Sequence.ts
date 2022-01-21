import { NonFunctionProperties } from "../../types";
import { Node } from "./Node";
import { Scope } from "./Scope";
import { SourceLocation } from "./SourceLocation";

type Props = NonFunctionProperties<Sequence>;

//  A group of nodes the type of which is the sequence of all nodes types
export class Sequence extends Scope {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    static merge(left: Node, right: Node) {
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

}
