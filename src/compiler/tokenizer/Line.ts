import { NonFunctionProperties } from "../../types";
import { Immutable } from "../Immutable";
import { Token } from "./Token";

type Props = NonFunctionProperties<Line>;

export class Line extends Immutable {

    tokens!: Token[];
    children!: Line[];

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

}
