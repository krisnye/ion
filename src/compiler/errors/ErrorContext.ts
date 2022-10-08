import Context from "./Context"
import * as Colors from "./Colors"
import { SourceLocation } from "../SourceLocation"

function pad(text: string, length: number, insert: string = " ") {
    while (text.length < length)
        text = insert + text
    return text
}

function isCloseLine(a?: SourceLocation, b?: SourceLocation, maxDiff = 5) {
    return a && b
        && a.filename == b.filename
        && a.start.line === a.finish.line
        && b.start.line === b.finish.line
        && Math.abs(a.start.line - b.start.line) <= maxDiff
}

export default class ErrorContext extends Context
{

    wrapErrorLine(lineNumber: number, errorLocation: SourceLocation, start: string, finish: string, lineText: string | undefined = this.getLine(lineNumber)) {
        if (lineText == null)
            return undefined

        if (lineNumber < errorLocation.start.line || lineNumber > errorLocation.finish.line)
            return lineText
        if (lineNumber > errorLocation.start.line && lineNumber < errorLocation.finish.line)
            return start + lineText + finish
        let startIndex = lineNumber == errorLocation.start.line ? errorLocation.start.column - 1 : 0
        let endIndex = lineNumber == errorLocation.finish.line ? errorLocation.finish.column - 1 : lineText.length + 1
        if (startIndex >= lineText.length) {
            //  error is at finish of file.
            let append = Colors.Dim + " "
            lineText += append
            endIndex = startIndex + append.length
        }
        if (startIndex == endIndex)
            endIndex += 1
        let result = lineText.substring(0, startIndex - 1) + start + lineText.substring(startIndex - 1, endIndex - 1) + finish + lineText.substring(endIndex - 1)
        return result
    }

    getLinesWithNumbers(startLine: number, endLine: number, ...errorLocations: SourceLocation[]): [number, string] {
        if (errorLocations.length > 1) {
            errorLocations.sort((a, b) => b.start.column - a.start.column)
        }
        let lineDigits = Math.max(Math.max(0, startLine).toString().length, endLine.toString().length)
        let linePrefix = "| "
        let lines = new Array<string>();
        for (let i = startLine; i <= endLine; i++) {
            let line: string | undefined = undefined
            for (let errorLocation of errorLocations) {
                line = this.wrapErrorLine(i, errorLocation, Colors.BgMagenta, Colors.Reset, line)
            }
            if (line != null) {
                lines.push(Colors.Dim + pad(i.toString(), lineDigits) + linePrefix + Colors.Reset + line)
            }
        }
        return [lineDigits + linePrefix.length, lines.join('\n')]
    }

    getError(errorDescription: string, ...locations: SourceLocation[]) {
        let message = errorDescription + "\n"
        locations = locations.filter(Boolean);
        for (let i = 0; i < locations.length; i++) {
            let location = locations[i]
            let { filename } = location
            let combineLocations = [location]
            while (isCloseLine(location, locations[i + 1])) {
                combineLocations.push(locations[++i])
            }
            let startLine = Math.min(...combineLocations.map(l => l.start.line))
            let endLine = Math.max(...combineLocations.map(l => l.finish.line))
            let extraLines = locations.length > 1 ? 1 : 2
            // maybe add more locations if they're on the same line
            let [padLength, errorLines] = this.getLinesWithNumbers(startLine - extraLines, endLine + extraLines, ...combineLocations)
            message +=
                "\n" +
                Colors.Dim + pad("", padLength - 1, "/") + " " + filename + "\n" + Colors.Reset +
                errorLines + "\n"
        }

        let error: any = new Error(message)
        error.description = errorDescription
        error.location = locations[0]
        error.locations = locations
        return error
    }

}