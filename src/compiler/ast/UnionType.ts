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

    static join(...types: Type[]): Type | null
    static join(type: Type, ...types: Type[]): Type
    static join(...types: Type[]): Type | null {
        let left = types[0] ?? null;
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