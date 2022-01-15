import { Expression } from "../ast/Expression";
import { PrefixParselet } from "./PrefixParselet";
import { SemanticError } from "../SemanticError";
import { Token } from "../tokenizer/Token";
import { tokenTypes } from "../tokenizer/TokenType";

export class Parser {

    private tokens: Token[] = [];
    private prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet };

    constructor(
        prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet }
    ) {
        this.prefixParselets = prefixParselets;
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

    setTokens(tokens: Token[]) {
        this.tokens = [...tokens].reverse();
    }

    // parseModule() {
    //     return this.parseExpression();
    // }

    parseExpression(): Expression {
        let token = this.consume();
        let prefix = this.prefixParselets[token.type as keyof typeof tokenTypes];
        if (prefix == null) {
            throw new SemanticError(`Could not parse: ${token.type}(${token.source})`)
        }
        return prefix.parse(this, token);
    }

}