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

    toString() {
        return `${this.left} & ${this.right}`;
    }

}