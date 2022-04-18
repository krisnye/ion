import { Parser } from "../Parser";
import { Token } from "../../Token";
import { prefixAmbiguous, prefixPrecedence } from "../operators";
import { SemanticError } from "../../SemanticError";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { UnaryOperation } from "../../pst/UnaryOperation";
import { BinaryOperation } from "../../pst/BinaryOperation";
import { Expression } from "../../ast/Expression";

export function getBinaryOperationPrecedence(node) {
    if (node instanceof BinaryOperation) {
        return node.getPrecedence();
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

    parse(p: Parser, operator: Token): Node {
        let { value, location } = operator;
        let argument = this.parseArgument(p, operator);

        let argumentBinaryOperationPrecedence = getBinaryOperationPrecedence(argument);
        let precedence = this.getPrecedence(operator);
        if (argumentBinaryOperationPrecedence != null
            && precedence != null
            && argumentBinaryOperationPrecedence > precedence
            && prefixAmbiguous[operator.value]
        ) {
            //  only exponentiation operator ** has higher precedence than unary operators
            //  we need a grouping construct because
            //  otherwise we don't know if -1 ** 2 is (-1) ** 2 or -(1 ** 2)
            let name = (argument as BinaryOperation).operator.value;
            // console.log({
            //     name,
            //     precedence,
            //     token: token.value,
            //     argumentBinaryOperationPrecedence,
            // })
            throw new SemanticError(`Unary operator '${operator.source}' used before '${name}'. Use parentheses to disambiguate operator precedence.`, location);
        }

        return new UnaryOperation({
            location: SourceLocation.merge(location, argument.location),
            operator,
            value: argument as Expression,
        })
    }

}