import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { infixPrecedence, prefixPrecedence } from "../operators";
import { Identifier } from "../../ast/Identifier";
import { Call } from "../../ast/Call";
import { SemanticError } from "../../SemanticError";
import { Node } from "../../ast/Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../ast/SourceLocation";

export function getBinaryOperationPrecedence(node) {
    if (node instanceof Call && node.arguments.length === 2 && node.callee instanceof Identifier) {
        return infixPrecedence[node.callee.name];
    }
}

export class PrefixOperatorParselet extends PrefixParselet {

    protected getPrecedence(token: Token) {
        return prefixPrecedence[token.value];
    }

    protected parseArgument(p: Parser, token: Token, precedence = this.getPrecedence(token)): Node {
        if (precedence == null) {
            let { value, location } = token;
            throw new SemanticError(`Prefix operator not found: ${value}`, location);
        }
        let argument = p.parseExpression(precedence);
        return argument;
    }

    parse(p: Parser, token: Token): Node {
        let { value, location } = token;
        let argument = this.parseArgument(p, token);
        let callee = new Identifier({ location, name: value });
        let argumentBinaryOperationPrecedence = getBinaryOperationPrecedence(argument);
        let precedence = this.getPrecedence(token);
        if (argumentBinaryOperationPrecedence != null
            && precedence != null
            && argumentBinaryOperationPrecedence > precedence
        ) {
            //  only exponentiation operator ** has higher precedence than unary operators
            //  we need a grouping construct because
            //  otherwise we don't know if -1 ** 2 is (-1) ** 2 or -(1 ** 2)
            let name = ((argument as Call).callee as Identifier).name;
            throw new SemanticError(`Unary operation used before ${name}. Use parentheses to disambiguate operator precedence.`, location);
        }
        return new Call({
            location: SourceLocation.merge(location, argument.location),
            callee,
            arguments: [argument]
        });
    }

}