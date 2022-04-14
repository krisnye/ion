import { Node, NodeProps } from "../Node";
import { NumberType } from "./NumberType";
import { Type } from "./Type";

export interface UnionTypeProps extends NodeProps {
    left: Node;
    right: Node;
}

export class UnionType extends Node implements Type {

    left!: Node;
    right!: Node;

    constructor(props: UnionTypeProps) { super(props); }
    patch(props: Partial<UnionTypeProps>) {
        return super.patch(props);
    }

    simplify() {
        if (this.left.toString() === this.right.toString()) {
            return this.left;
        }
        if (this.left instanceof NumberType && this.right instanceof NumberType) {
            const combined = NumberType.union(this.left, this.right);
            if (combined != null) {
                return combined;
            }
        }
        return this;
    }

    toString() {
        return `${this.left} | ${this.right}`;
    }

}