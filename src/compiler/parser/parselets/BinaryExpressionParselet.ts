import { Parser } from "../Parser";
import { Token } from "../../Token";
import { getInfixPrecedence, infixRightAssociative } from "../operators";
import { SemanticError } from "../../SemanticError";
import { Node } from "../../Node";
import { Expression } from "../../ast/Expression";
import { SourceLocation } from "../../SourceLocation";
import { InfixParselet } from "../InfixParslet";
import { BinaryExpression } from "../../pst/BinaryExpression";

export class BinaryExpressionParselet extends InfixParselet {

    protected parseRight(p: Parser, token: Token, allowBlock = true): Node {
        let { value, location } = token;
        let precedence = this.getPrecedence(token);
        if (precedence == null) {
            throw new SemanticError(`Infix operator not found: ${value}`, location);
        }
        let right = allowBlock && p.maybeParseBlock() || p.parseExpression(precedence + (infixRightAssociative[value] ? -1 : 0));
        return right;
    }

    parse(p: Parser, left: Node, operator: Token): Node {
        let right = this.parseRight(p, operator);
        
        return new BinaryExpression({
            location: SourceLocation.merge(left.location, right.location),
            left: left as Expression,
            operator,
            right: right as Expression,
        });
    }

    getPrecedence(token: Token) {
        return getInfixPrecedence(token.value);
    }

}