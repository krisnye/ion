import { Node, NodeProps } from "../Node";
import { isType, Type } from "./Type";

export interface CompoundTypeProps extends NodeProps {
    left: Node;
    right: Node;
}

export abstract class CompoundType extends Node implements Type {

    left!: Type;
    right!: Type;

    constructor(props: CompoundTypeProps) { super(props); }
    patch(props: Partial<CompoundTypeProps>) {
        return super.patch(props);
    }

    merge(b: Type) {
        return null;
    }

    isSubtypeOf(b: Type): boolean | null {
        throw new Error("Compound Types Cannot check directly, that logic is handled by isConsequent");
    }

    protected simplifyInternal(union: boolean) {
        let left = this.left.simplify();
        let right = this.right.simplify();
        if (left.toString() === right.toString()) {
            return left;
        }
        if (isType(left) && isType(right)) {
            const combined = left.merge(right, union);
            if (combined != null) {
                return combined;
            }
        }
        if (left != this.left || right != this.right) {
            return this.patch({ left, right });
        }
        return this;
    }

    toString() {
        return `${this.left} & ${this.right}`;
    }

}