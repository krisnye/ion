import { Expression } from "../ast/Expression";
import { PrefixParselet } from "./PrefixParselet";
import { SemanticError } from "../SemanticError";
import { Token } from "../tokenizer/Token";
import { tokenTypes } from "../tokenizer/TokenType";
import { InfixParselet } from "./InfixParslet";

export class Parser {

    private tokens: Token[] = [];
    private prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet };
    private infixParselets: { [key in keyof typeof tokenTypes]?: InfixParselet };

    constructor(
        prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet },
        infixParselets: { [key in keyof typeof tokenTypes]?: InfixParselet },
    ) {
        this.prefixParselets = prefixParselets;
        this.infixParselets = infixParselets;
    }

    consume(tokenType?: keyof typeof tokenTypes) {
        let token = this.tokens.pop();
        if (token == null) {
            throw new Error(`Unexpected EOF`)
        }
        if (tokenType != null && token.type !== tokenType) {
            throw new SemanticError(`Expected: ${tokenType}`, token.location)
        }
        return token;
    }

    peek(): Token | undefined {
        return this.tokens[this.tokens.length - 1];
    }

    setTokens(tokens: Token[]) {
        this.tokens = [...tokens].reverse();
    }

    parseExpression(): Expression {
        let token = this.consume();
        let prefix = this.prefixParselets[token.type as keyof typeof tokenTypes];
        if (prefix == null) {
            throw new SemanticError(`Could not parse: ${token.type}(${token.source})`)
        }
        let left = prefix.parse(this, token);
        let next = this.peek();
        if (next != null) {
            let infix = this.infixParselets[next.type as keyof typeof tokenTypes];
            if (infix != null) {
                this.consume();
                return infix.parse(this, left, next);
            }
        }
        return left;
    }

}