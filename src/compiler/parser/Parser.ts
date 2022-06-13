import { PrefixParselet } from "./PrefixParselet";
import { SemanticError } from "../SemanticError";
import { Token } from "../Token";
import { InfixParselet } from "./InfixParslet";
import { Node } from "../Node";
import { Block } from "../ast/Block";
import { SourceLocation } from "../SourceLocation";
import { Module } from "../pst/Module";
import { SourcePosition } from "../SourcePosition";
import { tokenTypes } from "../tokenizer/TokenType";
import { Expression } from "../ast/Expression";
import { resourceLimits } from "worker_threads";

export class Parser {

    private tokens: Token[] = [];
    private prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet };
    private infixParselets: { [key in keyof typeof tokenTypes]?: InfixParselet };
    private parseOutline = true;

    constructor(
        prefixParselets: { [key in keyof typeof tokenTypes]?: PrefixParselet },
        infixParselets: { [key in keyof typeof tokenTypes]?: InfixParselet },
    ) {
        this.prefixParselets = prefixParselets;
        this.infixParselets = infixParselets;
    }

    maybeConsume(tokenType?: string, value?: any)
    maybeConsume(tokenType?: string[], value?: any)
    maybeConsume(tokenType?: string | string[], value?: any): Token | null {
        for (let type of Array.isArray(tokenType) ? tokenType : [tokenType]) {
            let result = this.consumeInternal(type, value, false);
            if (result != null) {
                return result;
            }
        }
        return null;
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

    done() {
        return this.tokens.length === 0;
    }

    peek(tokenType?: string, offset = 0): Token | null {
        let token = this.tokens[this.tokens.length - 1 - offset];
        if (token != null && (tokenType == null || tokenType === token.type)) {
            return token;
        }
        return null;
    }

    setTokens(tokens: Token[]): this {
        this.tokens = [...tokens].reverse();
        return this;
    }

    parseModule(filename: string, tokens: Token[]): Module {
        this.setTokens(tokens);
        this.eol();

        let nodes = new Array<Node>();
        while (!this.done()) {
            this.whitespace();
            nodes.push(this.parseExpression());
            this.eol();
        }

        if (!this.done()) {
            throw new SemanticError(`Expected EOL or EOF`, this.peek()!.location);
        }

        return new Module({
            location: nodes.length > 0
                ? SourceLocation.merge(nodes[0].location, nodes[nodes.length - 1].location)
                : new SourceLocation(filename, new SourcePosition(0, 0), new SourcePosition(0, 0)),
            name: filename,
            nodes: nodes as Expression[],
            dependencies: []
        })
    }

    maybeParseBlock() : Block | null {
        if (this.parseOutline && this.peek(tokenTypes.Eol.name, 0) && this.peek(tokenTypes.Indent.name, 1)) {
            return this.parseBlock();
        }
        else {
            return null;
        }
    }

    parseBlock(indent = (this.eol(1), this.consume(tokenTypes.Indent.name))): Block {
        let nodes = new Array<Node>();
        let outdent: Token | null = null;
        this.eol();

        while (!this.done()) {
            this.whitespace();
            nodes.push(this.maybeParseBlock() || this.parseExpression());
            this.eol();
            if (outdent = this.maybeConsume(tokenTypes.Outdent.name)) {
                break;
            }
        }

        return new Block({
            location: SourceLocation.merge(indent.location, outdent!.location),
            nodes: nodes as Expression[],
        })
    }

    eol(min = 0) {
        let count = 0;
        this.whitespace();
        this.maybeConsume(tokenTypes.Comment.name);
        while (this.maybeConsume(tokenTypes.Eol.name)) {
            count++;
            this.whitespace();
            this.maybeConsume(tokenTypes.Comment.name);
        }
        if (count < min) {
            throw new SemanticError(`Expected EOL`, this.peek()!.location);
        }
        return count;
    }

    whitespace() {
        let result: Token | undefined = undefined;
        while (true) {
            let whitespace = this.maybeConsume(tokenTypes.Whitespace.name);
            if (whitespace) {
                result = whitespace;
            }
            else {
                break;
            }
        }
        return result;
    }

    parseInlineExpression(precedence: number = 0): Node {
        let save = this.parseOutline;
        this.parseOutline = false;
        let result = this.parseExpression(precedence);
        this.parseOutline = save;
        return result;
    }

    parseExpression(precedence: number = 0): Node {
        let token = this.consume();
        this.whitespace();
        let prefix = this.prefixParselets[token.type as any];
        if (prefix == null) {
            throw new SemanticError(`Could not parse: ${token.type}(${token.source})`)
        }
        let left = prefix.parse(this, token);

        while (true) {
            this.whitespace();
            let next = this.peek();
            if (next != null) {
                let infix = this.infixParselets[next.type as any];
                if (infix != null && precedence < (infix.getPrecedence(next) ?? 0)) {
                    this.consume();
                    this.whitespace();
                    left = infix.parse(this, left, next);
                    continue;
                }
            }
            break;
        }

        return left;
    }

}