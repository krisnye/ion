import { SourcePosition } from "./SourcePosition";

export class SourceLocation {

    filename: string;
    start: SourcePosition;
    finish: SourcePosition;

    constructor(filename: string, start: SourcePosition, finish: SourcePosition) {
        this.filename = filename;
        this.start = start;
        this.finish = finish;
    }

}
