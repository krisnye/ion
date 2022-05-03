import { Node, NodeProps } from "../Node";

export interface PairProps<K extends Node = Node,V extends Node = Node> extends NodeProps {
    key: K
    value: V
}

export class Pair<K extends Node = Node,V extends Node = Node> extends Node {

    key!: K
    value!: V

    constructor(props: PairProps<K,V>) { super(props); }
    patch(props: Partial<PairProps<K,V>>) { return super.patch(props); }

    toString() {
        return `${this.key} = ${this.value}`
    }
}
