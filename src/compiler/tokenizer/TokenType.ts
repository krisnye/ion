
type ValueFunction = (source: string) => any
type Options = { value?: ValueFunction, mergeAdjacent?: boolean }
const identity = source => source;

export class TokenType {

    readonly name: string;
    readonly match: (line: string) => number;
    readonly value: ValueFunction;
    readonly mergeAdjacent: boolean;

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
    Tab: new TokenType("Tab", /^((    )|\t)+/, { value: source => source.length / 4 }),
    Whitespace: new TokenType("Whitespace", /^\s+/),
    Open: new TokenType("Open", /^[\({\[]/),
    Close: new TokenType("Close", /^[\)}\]]/),
    Float: new TokenType("Float", /^[-\+]?[1-9][0-9]*\.[0-9]+(e[+-]?[0-9]+)?/, { value: parse }),
    Integer: new TokenType("Integer", /^[-\+]?([1-9][0-9]*|0x[0-9]+)/, { value: parse }),
    String: new TokenType("String", /^"([^"\\]|\\.)*"/, { value: JSON.parse }),
    // Operator has to come after Float/Integer so an adjacent - or + binds to literal.
    Operator: new TokenType("Operator", /^(void|[\=\+\-\*\&\^\%\!\~\/\.\:\;\?\,\<\>]+)/i),
    //  Id has to come after Operator because of operator 'void'
    Id: new TokenType("Id", /^[_@a-z][_$@a-z0-9]*/i),
    Unknown: new TokenType("Unknown", /^./, { mergeAdjacent: true }),
} as const;
