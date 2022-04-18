import { SourceLocation } from "../SourceLocation";
import { CompoundType, CompoundTypeProps } from "./CompoundType";
import { Type } from "./Type";

export interface UnionTypeProps extends CompoundTypeProps {
}

export class UnionType extends CompoundType implements Type {

    constructor(props: UnionTypeProps) { super(props); }
    patch(props: Partial<UnionTypeProps>) {
        return super.patch(props);
    }

    simplify() {
        return this.simplifyInternal(true);
    }

    isSubtypeOf(b: Type): boolean | null {
        const left = this.left.isSubtypeOf(b);
        const right = this.right.isSubtypeOf(b);
        //  1 1 => 1
        if (left === true && right === true) {
            return true;
        }
        //  0 0 => 0
        if (left === false && right === false) {
            return false;
        }
        //  1 0 => n
        //  1 n => n
        //  0 n => n
        //  n n => n
        return null;
    }

    static join(types: Type[]) {
        let left = types[0];
        for (let i = 1; i < types.length; i++) {
            let right = types[i];
            left = new UnionType({
                location: SourceLocation.merge(left.location, right.location),
                left,
                right
            });
        }
        return left;
    }

    toString() {
        return `${this.left} | ${this.right}`;
    }

}