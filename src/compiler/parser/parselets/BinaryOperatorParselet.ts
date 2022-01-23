import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { infixPrecedence, infixRightAssociative } from "../operators";
import { Identifier } from "../../ast/Identifier";
import { Call } from "../../ast/Call";
import { SemanticError } from "../../SemanticError";
import { Node } from "../../ast/Node";
import { SourceLocation } from "../../ast/SourceLocation";
import { InfixParselet } from "../InfixParslet";

export class BinaryOperatorParselet extends InfixParselet {

    protected parseRight(p: Parser, token: Token): Node {
        let { value, location } = token;
        let precedence = this.getPrecedence(token);
        if (precedence == null) {
            throw new SemanticError(`Infix operator not found: ${value}`, location);
        }
        let right = p.parseExpression(precedence + (infixRightAssociative[value] ? -1 : 0));
        return right;
    }

    parse(p: Parser, left: Node, operator: Token): Node {
        let right = this.parseRight(p, operator);
        return new Call({
            location: SourceLocation.merge(left.location, right.location),
            callee: new Identifier({ location: operator.value, name: operator.value }),
            arguments: [left, right]
        });
    }

    getPrecedence(token: Token) {
        return infixPrecedence[token.value];
    }

}