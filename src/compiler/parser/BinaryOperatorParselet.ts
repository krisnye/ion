import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { infixPrecedence, infixRightAssociative } from "./operators";
import { Reference } from "../ast/Reference";
import { Call } from "../ast/Call";
import { SemanticError } from "../SemanticError";
import { Expression } from "../ast/Expression";
import { SourceLocation } from "../ast/SourceLocation";
import { InfixParselet } from "./InfixParslet";

export class BinaryOperatorParselet extends InfixParselet {

    parse(p: Parser, left: Expression, token: Token): Expression {
        let { value, location } = token;
        let precedence = infixPrecedence[value];
        if (precedence == null) {
            throw new SemanticError(`Infix operator not found: ${value}`, location);
        }
        let right = p.parseExpression(precedence + (infixRightAssociative[value] ? -1 : 0));
        let callee = new Reference({ location, name: value });
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