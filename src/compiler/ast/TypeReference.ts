import { Reference, ReferenceProps } from "./Reference";
import { Type } from "./Type";

export interface TypeReferenceProps extends ReferenceProps  {
}

export class TypeReference extends Reference implements Type  {

    constructor(props: TypeReferenceProps) { super(props); }
    patch(props: Partial<TypeReferenceProps>) { return super.patch(props); }

    merge(b: Type) {
        return null;
    }

    // protected resolve(c: EvaluationContext): Expression {
    //     if (this.name === coreTypes.Float) {
    //         return new NumberType({ location: this.location, integer: false }) as any
    //     }
    //     if (this.name === coreTypes.Float) {
    //         return new NumberType({ location: this.location, integer: true }) as any
    //     }
    //     return super.resolve(c);
    // }

    isSubtypeOf(b: Type): boolean | null {
        if (b instanceof TypeReference) {
            return this.name === b.name;
        }
        return false;
    }

}