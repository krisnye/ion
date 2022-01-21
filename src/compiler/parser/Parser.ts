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

    maybeConsume(tokenType?: string, value?: any) {
        return this.consumeInternal(tokenType, value, false);
    }

    consume(tokenType?: string, value?: any): Token {
        return this.consumeInternal(tokenType, value, true)!;
    }

    private consumeInternal(tokenType?: string, value?: any, required = true): Token | null {
        let token = this.peek();
        if (token == null) {
            if (required) {
                throw new Error(`Unexpected EOF`)
            }
            else {
                return null;
            }
        }
        if (tokenType != null && token.type !== tokenType) {
            if (required) {
                throw new SemanticError(`Expected: ${tokenType}`, token.location)
            }
            else {
                return null;
            }
        }
        if (value !== undefined && token.value !== value) {
            if (required) {
                throw new SemanticError(`Expected: ${value}`, token.value)
            }
            else {
                return null;
            }
        }
        this.tokens.pop();
        return token;
    }

    peek(): Token | undefined {
        return this.tokens[this.tokens.length - 1];
    }

    setTokens(tokens: Token[]) {
        this.tokens = [...tokens].reverse();
    }

    parseStatement(): Node {
        //  if
        //  for
        //  return
        //  class
        //  switch
        //  named function?
        throw "nyi";
    }

    parseExpression(precedence: number): Node {
        this.maybeConsume(tokenTypes.Whitespace.name);
        let token = this.consume();
        let prefix = this.prefixParselets[token.type as keyof typeof tokenTypes];
        if (prefix == null) {
            throw new SemanticError(`Could not parse: ${token.type}(${token.source})`)
        }
        let left = prefix.parse(this, token);

        while (true) {
            this.maybeConsume(tokenTypes.Whitespace.name);
            let next = this.peek();
            if (next != null) {
                let infix = this.infixParselets[next.type as keyof typeof tokenTypes];
                if (infix != null && precedence < (infix.getPrecedence(next) ?? 0)) {
                    this.maybeConsume(tokenTypes.Whitespace.name);
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