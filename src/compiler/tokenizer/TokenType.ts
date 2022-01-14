import { Token } from "./Token";

type ValueFunction = (source: string) => any;

export class TokenType {

    readonly match: (line: string) => number;
    readonly value?: ValueFunction;

    constructor(match: RegExp, value?: ValueFunction)
    constructor(match: (line: string) => number, value?: ValueFunction)
    constructor(match: RegExp | ((line: string) => number), value?: ValueFunction) {
        if (match instanceof RegExp) {
            const regexp = match;
            match = (line: string) => {
                let result = regexp.exec(line);
                return result != null ? result[0].length : -1;
            }
        }
        this.match = match;
        this.value = value;
    }

}

export const tokenTypes = {
    Id: new TokenType(/^[_@a-z][_$@a-z0-9]+/i),
    Operator: new TokenType(/^[\=\+\-\*\&\^\%\#\!\~\/\.\:\;\?\,\<\>]+/i),
    Tab: new TokenType(/^((    )|\t)+/, source => source.length / 4),
    Whitespace: new TokenType(/^\s+/),
    Open: new TokenType( /^[\({\[]/),
    Close: new TokenType(/^[\)}\]]/),
    Float: new TokenType(/^-?[1-9][0-9]*\.[0-9]+(e[+-]?[0-9]+)?/, JSON.parse),
    Integer: new TokenType(/^-?([1-9][0-9]*|0x[0-9]+)/, JSON.parse),
    String: new TokenType(/^"([^"\\]|\\.)*"/, JSON.parse),
    Comment: new TokenType(/^\/\/.*/),
    Unknown: new TokenType(/^.*/),
} as const;
