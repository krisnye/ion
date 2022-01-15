import { PrefixParselet } from "./PrefixParselet";
import { SemanticError } from "../SemanticError";
import { Token } from "../tokenizer/Token";
import { InfixParselet } from "./InfixParslet";
import { tokenTypes } from "../tokenizer/TokenType";
import { Node } from "../ast/Node";

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

    consume(tokenType?: string, value?: any) {
        let token = this.tokens.pop();
        if (token == null) {
            throw new Error(`Unexpected EOF`)
        }
        if (tokenType != null && token.type !== tokenType) {
            throw new SemanticError(`Expected: ${tokenType}`, token.location)
        }
        if (value !== undefined && token.value !== value) {
            throw new SemanticError(`Expected: ${value}`, token.value)
        }
        return token;
    }

    peek(): Token | undefined {
        return this.tokens[this.tokens.length - 1];
    }

    setTokens(tokens: Token[]) {
        this.tokens = [...tokens].reverse();
    }

    parseExpression(precedence: number): Node {
        let token = this.consume();
        let prefix = this.prefixParselets[token.type as keyof typeof tokenTypes];
        if (prefix == null) {
            throw new SemanticError(`Could not parse: ${token.type}(${token.source})`)
        }
        let left = prefix.parse(this, token);

        while (true) {
            let next = this.peek();
            if (next != null) {
                let infix = this.infixParselets[next.type as keyof typeof tokenTypes];
                if (infix != null && precedence < infix.getPrecedence(next)) {
                    this.consume();
                    left = infix.parse(this, left, next);
                    continue;
                }
            }
            break;
        }

        return left;
    }

}