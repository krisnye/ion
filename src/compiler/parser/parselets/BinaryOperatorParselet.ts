import { Parser } from "../Parser";
import { Token } from "../../Token";
import { infixPrecedence, infixRightAssociative } from "../operators";
import { Identifier } from "../../pst/Identifier";
import { SemanticError } from "../../SemanticError";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { InfixParselet } from "../InfixParslet";
import { BinaryOperation } from "../../pst/BinaryOperation";

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
        
        return new BinaryOperation({
            location: SourceLocation.merge(left.location, right.location),
            left,
            operator,
            right,
        });
    }

    getPrecedence(token: Token) {
        return infixPrecedence[token.value];
    }

}