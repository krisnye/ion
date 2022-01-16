import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { infixPrecedence, infixRightAssociative } from "./operators";
import { Identifier } from "../ast/Identifier";
import { Call } from "../ast/Call";
import { SemanticError } from "../SemanticError";
import { Node } from "../ast/Node";
import { SourceLocation } from "../ast/SourceLocation";
import { InfixParselet } from "./InfixParslet";

export class BinaryOperatorParselet extends InfixParselet {

    protected parseRight(p: Parser, token: Token): Node {
        let { value, location } = token;
        let precedence = infixPrecedence[value];
        if (precedence == null) {
            throw new SemanticError(`Infix operator not found: ${value}`, location);
        }
        let right = p.parseExpression(precedence + (infixRightAssociative[value] ? -1 : 0));
        return right;
    }

    parse(p: Parser, left: Node, token: Token): Node {
        let { value, location } = token;
        let right = this.parseRight(p, token);
        let callee = new Identifier({ location, name: value });
        return new Call({
            location: SourceLocation.merge(location, right.location),
            callee,
            arguments: [left, right]
        });
    }

    getPrecedence(token: Token) {
        return infixPrecedence[token.value] || -1;
    }

}