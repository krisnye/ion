import { Node, NodeProps } from "../Node";

export interface ScopeProps extends NodeProps {
    nodes: Node[];
}

export class Scope extends Node {

    nodes!: Node[];

    constructor(props: ScopeProps) { super(props); }
    patch(props: Partial<ScopeProps>) { return super.patch(props); }

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
