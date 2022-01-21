
type ValueFunction = (source: string) => any
type Options = { value?: ValueFunction, mergeAdjacent?: boolean, isWhitespace?: boolean }
const identity = source => source;

export class TokenType {

    readonly name: string;
    readonly match: (line: string) => number;
    readonly value: ValueFunction;
    readonly mergeAdjacent: boolean;
    readonly isWhitespace: boolean;

    constructor(name: string, match: RegExp, options?: Options)
    constructor(name: string, match: (line: string) => number, options?: Options)
    constructor(name: string, match: RegExp | ((line: string) => number), options?: Options) {
        if (match instanceof RegExp) {
            const regexp = match;
            match = (line: string) => {
                let result = regexp.exec(line);
                return result != null ? result[0].length : -1;
            }
        }
        this.name = name;
        this.match = match;
        this.value = options?.value ?? identity;
        this.mergeAdjacent = options?.mergeAdjacent ?? false;
        this.isWhitespace = options?.isWhitespace ?? false;
    }

    toString() {
        return this.name;
    }

}

function parse(value: string) {
    if (value.startsWith("+")) {
        value = value.slice(1);
    }
    return JSON.parse(value);
}

export const tokenTypes = {
    //  Comment must come before Operator otherwise '//' interpreted as an operator
    Comment: new TokenType("Comment", /^\/\/.*/),
    Dent: new TokenType("Dent", /^(    )/, { isWhitespace: true }),
    Whitespace: new TokenType("Whitespace", /^[^\S\r\n]+/, { isWhitespace: true }),
    OpenParen: new TokenType("OpenParen", /^\(/),
    CloseParen: new TokenType("CloseParen", /^\)/),
    OpenBracket: new TokenType("OpenBracket", /^\[/),
    CloseBracket: new TokenType("CloseBracket", /^\]/),
    OpenBrace: new TokenType("OpenBrace", /^\{/),
    CloseBrace: new TokenType("CloseBrace", /^\}/),
    Float: new TokenType("Float", /^[1-9][0-9]*\.[0-9]+(e[+-]?[0-9]+)?/, { value: parse }),
    Integer: new TokenType("Integer", /^([1-9][0-9]*|0x[0-9]+)/, { value: parse }),
    String: new TokenType("String", /^"([^"\\]|\\.)*"/, { value: JSON.parse }),
    // Operator has to come after Float/Integer so an adjacent - or + binds to literal.
    Operator: new TokenType("Operator", /^(void|[\=\+\-\*\&\^\%\!\~\/\.\:\;\?\,\<\>\|\&]+)/i),
    //  Id has to come after Operator because of operator 'void'
    Id: new TokenType("Id", /^[_@a-z][_$@a-z0-9]*/i),
    Eol: new TokenType("Eol", /^\r\n|\r|\n/, { isWhitespace: true }),
    Unknown: new TokenType("Unknown", /^./, { mergeAdjacent: true }),
    //  anything after Unknown will never be matched against, they're manually inserted.
    Indent: new TokenType("Indent", /^[]/, { isWhitespace: true }),
    Outdent: new TokenType("Outdent", /^[]/, { isWhitespace: true }),
} as const;
