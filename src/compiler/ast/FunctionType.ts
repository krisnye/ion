import { FunctionBase, FunctionBaseProps } from "./FunctionBase";
import { Type } from "./Type";

export interface FunctionTypeProps extends FunctionBaseProps {
}

export class FunctionType extends FunctionBase implements Type {

    constructor(props: FunctionTypeProps) { super(props); }
    patch(props: Partial<FunctionTypeProps>) { return super.patch(props); }

    merge(b: Type, union: boolean): Type | null {
        return null;
    }
    isSubtypeOf(b: Type): boolean | null {
        // TODO: Maybe figure this out.
        return null;
    }

}