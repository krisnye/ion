import { SourceLocation } from "../SourceLocation"
import { SourcePosition } from "../SourcePosition"

export default class LocationCalculator
{
    readonly source: string
    readonly lines: number[] = []
    readonly columns: number[] = []

    constructor(source: string) {
        this.source = source
        let line = 1
        let column = 1
        //  add final line and column numbers for the EOF Location, we do this by comparing with <=
        for (let i = 0; i <= source.length; i++) {
            this.lines[i] = line
            this.columns[i] = column
            if (source.charCodeAt(i) == 10) {
                line++
                column = 1
            }
            else {
                column++
            }
        }
    }

    getLocation(start: number, end: number, filename: string) {
        return new SourceLocation(
            filename,
            new SourcePosition(this.lines[start], this.columns[start]),
            new SourcePosition(this.lines[end], this.columns[end]),
        )
    }

}