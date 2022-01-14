import { Line } from "./Line";
import { SourceLocation } from "./SourceLocation";
import { SourcePosition } from "./SourcePosition";
import { Token } from "./Token";
import { TokenType, tokenTypes } from "./TokenType";

export class Tokenizer {

    readonly types: { readonly [type: string]: TokenType };

    constructor(types: { readonly [type: string]: TokenType } = tokenTypes) {
        this.types = types;
    }

    tokenizeLine(filename: string, lineSource: string, lineIndex: number): Line {
        let tokens = new Array<Token>();
        let columnIndex = 0;
        while (lineSource.length > 0) {
            for (let type of Object.keys(this.types)) {
                let tokenType = this.types[type];
                let matchLength = tokenType.match(lineSource);
                if (matchLength > 0) {
                    let source = lineSource.slice(0, matchLength);
                    let value = tokenType.value?.(source);
                    let line = lineIndex + 1;
                    let column = columnIndex + 1;
                    let location = new SourceLocation(
                        filename,
                        new SourcePosition(line, column),
                        new SourcePosition(line, column + matchLength),
                    );
                    tokens.push(new Token({ type, source, value, location }));
                    columnIndex += matchLength;
                    lineSource = lineSource.slice(matchLength);
                    break;
                }
            }
        }
        return new Line({ tokens, children: [] });
    }

    tokenizeFile(filename: string, fileSource: string): Line[] {
        return fileSource.split(/\r\n|\r|\n/g).map(this.tokenizeLine.bind(this, filename));
    }

}