import { Token } from "./Token";

type ValueFunction = (source: string) => any;

export class TokenType {

    readonly name: string;
    readonly match: (line: string) => number;
    readonly value?: ValueFunction;

    constructor(name: string, match: RegExp, value?: ValueFunction)
    constructor(name: string, match: (line: string) => number, value?: ValueFunction)
    constructor(name: string, match: RegExp | ((line: string) => number), value?: ValueFunction) {
        if (match instanceof RegExp) {
            const regexp = match;
            match = (line: string) => {
                let result = regexp.exec(line);
                return result != null ? result[0].length : -1;
            }
        }
        this.name = name;
        this.match = match;
        this.value = value;
    }

}

export const tokenTypes = {
    Id: new TokenType("Id", /^[_@a-z][_$@a-z0-9]*/i),
    Comment: new TokenType("Comment", /^\/\/.*/),
    Operator: new TokenType("Operator", /^[\=\+\-\*\&\^\%\#\!\~\/\.\:\;\?\,\<\>]+/i),
    Tab: new TokenType("Tab", /^((    )|\t)+/, source => source.length / 4),
    Whitespace: new TokenType("Whitespace", /^\s+/),
    Open: new TokenType("Open",  /^[\({\[]/),
    Close: new TokenType("Close", /^[\)}\]]/),
    Float: new TokenType("Float", /^-?[1-9][0-9]*\.[0-9]+(e[+-]?[0-9]+)?/, JSON.parse),
    Integer: new TokenType("Integer", /^-?([1-9][0-9]*|0x[0-9]+)/, JSON.parse),
    String: new TokenType("String", /^"([^"\\]|\\.)*"/, JSON.parse),
    Unknown: new TokenType("Unknown", /^.*/),
} as const;
