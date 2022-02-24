import { NonFunctionProperties } from "../../types";
import { Node } from "../Node";

type Props = NonFunctionProperties<Scope>;

export class Scope extends Node {

    nodes!: Node[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

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
