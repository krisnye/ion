import { FunctionBase, FunctionBaseProps } from "./FunctionBase";

export interface FunctionTypeProps extends FunctionBaseProps {
}

export class FunctionType extends FunctionBase {

    constructor(props: FunctionTypeProps) { super(props); }
    patch(props: Partial<FunctionTypeProps>) { return super.patch(props); }

}