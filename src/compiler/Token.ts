import { NonFunctionProperties } from "../types";
import { Node } from "./Node";
import { SourceLocation } from "./SourceLocation";

type Props = NonFunctionProperties<Token>;

export class Token extends Node {

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

    toString() {
        return this.source;
    }

    toJSON() {
        return { type: this.type, source: this.source };
    }

}
