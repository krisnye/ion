import { NonFunctionProperties } from "../../types";
import { Immutable } from "../Immutable";
import { SourceLocation } from "../ast/SourceLocation";

type Props = NonFunctionProperties<Token>;

export class Token extends Immutable {

    readonly type!: string;
    readonly source!: string;
    readonly value!: any;
    readonly location!: SourceLocation;

    constructor(props: Props) { super(props); }
    patch(props: Partial<Props>) { return super.patch(props); }

    static merge(left: Token, right: Token) {
        return left.patch({
            source: left.source + right.source,
            value: left.value + right.value,
            location: SourceLocation.merge(left.location, right.location)
        })
    }
}
