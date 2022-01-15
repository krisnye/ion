import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { prefix } from "./operators";
import { Reference } from "../ast/Reference";
import { Call } from "../ast/Call";
import { SemanticError } from "../SemanticError";
import { Expression } from "../ast/Expression";
import { PrefixParselet } from "./PrefixParselet";
import { SourceLocation } from "../ast/SourceLocation";

export class PrefixOperatorParselet extends PrefixParselet {

    parse(p: Parser, token: Token): Expression {
        let { value, location } = token;
        let precedence = prefix[value];
        if (precedence == null) {
            throw new SemanticError(`Prefix operator not found: ${value}`, location);
        }
        let argument = p.parseExpression();
        let callee = new Reference({ location, name: value });
        return new Call({
            location: SourceLocation.merge(location, argument.location),
            callee,
            arguments: [argument]
        });
    }

}