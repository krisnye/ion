import { Token } from "../Token";

type ValueFunction = (source: string) => any
type Options = {
    value?: ValueFunction,
    mergeAdjacent?: boolean,
    isWhitespace?: boolean,
    discard?: boolean,
    previousPredicate?: (previous: Token | undefined) => boolean
}
const identity = source => source;

export class TokenType {

    readonly name: string;
    readonly match: (line: string) => number;
    readonly value: ValueFunction;
    readonly mergeAdjacent: boolean;
    readonly isWhitespace: boolean;
    readonly discard: boolean;
    readonly previousPredicate!: (previous: Token | undefined) => boolean

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
        this.discard = options?.discard ?? false;
    }

    toString() {
        return this.name;
    }

}

//  this is linear time now on types. We can make it much faster later.
export const tokenTypes = {
    //  Comment must come before Operator otherwise '//' interpreted as an operator
    Comment: new TokenType("Comment", /^\/\/.*/, { isWhitespace: true }),
    Dent: new TokenType("Dent", /^(    )/, {
        isWhitespace: true,
        previousPredicate(token: Token | undefined) {
            return token == null || token.type === tokenTypes.Dent.name || token.type === tokenTypes.Eol.name;
        }
    }),
    Whitespace: new TokenType("Whitespace", /^[^\S\r\n]+/, { isWhitespace: true }),
    OpenParen: new TokenType("OpenParen", /^\(/),
    CloseParen: new TokenType("CloseParen", /^\)/),
    OpenBracket: new TokenType("OpenBracket", /^\[/),
    CloseBracket: new TokenType("CloseBracket", /^\]/),
    OpenBrace: new TokenType("OpenBrace", /^\{/),
    CloseBrace: new TokenType("CloseBrace", /^\}/),
    Number: new TokenType("Number", /^[0-9]*\.[0-9]+(e[+-]?[0-9]+)?/, { value: JSON.parse }),
    Integer: new TokenType("Integer", /^([1-9][0-9]*|0x[0-9]+|0\b)/, { value: JSON.parse }),
    OutlineString: new TokenType("OutlineString", /^""/),
    String: new TokenType("String", /^"([^"\\]|\\.)*"/, { value: JSON.parse }),
    // Operator has to come after Number/Integer so an adjacent - or + binds to literal.
    Operator: new TokenType("Operator", /^(\bvoid\b|\btypeof\b|[\=\+\-\*\&\^\%\!\~\/\.\:\;\?\,\<\>\|\&:]+)/i),
    //  Id has to come after Operator because of operator 'void'
    In: new TokenType("In", /^in\b/),
    If: new TokenType("If", /^if\b/),
    Null: new TokenType("Null", /^null\b/),
    Else: new TokenType("Else", /^else\b/),
    Return: new TokenType("Return", /^return\b/),
    Class: new TokenType("Class", /^class\b/),
    Extends: new TokenType("Extends", /^extends\b/),
    For: new TokenType("For", /^for\b/),
    Id: new TokenType("Id", /^[_@a-z][_$@a-z0-9]*/i),
    EscapedId: new TokenType("EscapedId", /^`([^`\\]|\\.)*`/, { value: source => source.slice(1, -1) }),
    Eol: new TokenType("Eol", /^\r\n|\r|\n/, { isWhitespace: true }),
    Unknown: new TokenType("Unknown", /^./, { mergeAdjacent: true }),
    //  anything after Unknown will never be matched against, they're manually inserted.
    Indent: new TokenType("Indent", /^[]/, { isWhitespace: true }),
    Outdent: new TokenType("Outdent", /^[]/, { isWhitespace: true }),
} as const;
