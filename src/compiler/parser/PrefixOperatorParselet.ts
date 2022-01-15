import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { prefixPrecedence } from "./operators";
import { Identifier } from "../ast/Identifier";
import { Call } from "../ast/Call";
import { SemanticError } from "../SemanticError";
import { Node } from "../ast/Node";
import { PrefixParselet } from "./PrefixParselet";
import { SourceLocation } from "../ast/SourceLocation";

export class PrefixOperatorParselet extends PrefixParselet {

    parse(p: Parser, token: Token): Node {
        let { value, location } = token;
        let precedence = prefixPrecedence[value];
        if (precedence == null) {
            throw new SemanticError(`Prefix operator not found: ${value}`, location);
        }
        let argument = p.parseExpression(precedence);
        let callee = new Identifier({ location, name: value });
        return new Call({
            location: SourceLocation.merge(location, argument.location),
            callee,
            arguments: [argument]
        });
    }

}