import { SourceLocation } from "./SourceLocation";

export class SourcePosition {

    line: number;
    column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    static compare(a: SourcePosition, b: SourcePosition) {
        return Math.sign(a.line - b.line) || Math.sign(a.column - b.column);
    }

    static min(a: SourcePosition, b: SourcePosition) {
        return SourcePosition.compare(a, b) <= 0 ? a : b;
    }

    static max(a: SourcePosition, b: SourcePosition) {
        return SourcePosition.compare(a, b) <= 0 ? b : a;
    }

}
