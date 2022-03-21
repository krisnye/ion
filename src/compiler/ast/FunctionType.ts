import { NonFunctionProperties } from "../../types";
import { FunctionBase } from "./FunctionBase";

type Props = NonFunctionProperties<FunctionType>;

export class FunctionType extends FunctionBase {

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}