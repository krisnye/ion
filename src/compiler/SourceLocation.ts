import { Serializable } from "./Serializable";
import { SourcePosition } from "./SourcePosition";

export class SourceLocation extends Serializable {

    filename: string;
    start: SourcePosition;
    finish: SourcePosition;

    constructor(filename: string, start: SourcePosition, finish: SourcePosition) {
        super();
        this.filename = filename;
        this.start = start;
        this.finish = finish;
    }

    // this one never needs to be cloned.
    clone(): this {
        return this;
    }

    static merge(left: SourceLocation, right: SourceLocation) {
        return new SourceLocation(
            left.filename,
            SourcePosition.min(left.start, right.start),
            SourcePosition.max(left.finish, right.finish),
        )
    }

}
