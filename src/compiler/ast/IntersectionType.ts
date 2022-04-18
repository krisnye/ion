import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Type } from "./Type";

export interface IntersectionTypeProps extends CompoundTypeProps {
}

export class IntersectionType extends CompoundType implements Type {

    constructor(props: IntersectionTypeProps) { super(props); }
    patch(props: Partial<IntersectionTypeProps>) {
        return super.patch(props);
    }

    simplify() {
        return this.simplifyInternal(false);
    }

    isSubtypeOf(b: Type): boolean | null {
        const left = this.left.isSubtypeOf(b);
        const right = this.right.isSubtypeOf(b);
        //  1 1 => 1
        if (left === true && right === true) {
            return true;
        }
        //  1 0 => n
        //  0 0 => 0
        //  0 n => n
        if (left === false || right === false) {
            return false;
        }
        //  1 n => n
        //  n n => n
        return null;
    }

    toString() {
        return `${this.left} & ${this.right}`;
    }

}