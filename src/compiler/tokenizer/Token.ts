import { NonFunctionProperties, NonFunctionPropertyNames } from "../../types";
import { Immutable } from "../Immutable";
import { SourceLocation } from "./SourceLocation";

type Props = NonFunctionProperties<Token>;

export class Token extends Immutable {

    readonly type!: string;
    readonly source!: string;
    readonly value?: any;
    readonly location!: SourceLocation;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}
