import { Immutable } from "./Immutable";
import { SourceLocation } from "./SourceLocation";

export interface TokenProps {
    type: string;
    source: string;
    value: any;
    location: SourceLocation;
}

export class Token extends Immutable {

    readonly type!: string;
    readonly source!: string;
    readonly value!: any;
    readonly location!: SourceLocation;

    constructor(props: TokenProps) { super(props); }
    patch(props: Partial<TokenProps>) { return super.patch(props); }

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
        return { type: this.type, source: this.source } as any;
    }

}
