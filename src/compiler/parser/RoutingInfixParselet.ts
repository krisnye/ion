import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";
import { InfixParselet } from "./InfixParslet";
import { SemanticError } from "../SemanticError";

export class RoutingInfixParselet extends InfixParselet {

    valueParselets: { [value: string]: InfixParselet | undefined };
    defaultParselet?: InfixParselet;

    constructor(
        valueParselets: { [value: string]: InfixParselet | undefined },
        defaultParselet?: InfixParselet,
    ) {
        super();
        this.valueParselets = valueParselets;
        this.defaultParselet = defaultParselet;
    }

    private getParselet(token) {
        let { value } = token;
        let parselet = this.valueParselets[value] ?? this.defaultParselet;
        if (parselet == null) {
            throw new SemanticError(`Unexpected token: ${value}`, token.location);
        }
        return parselet;
    }

    parse(p: Parser, left: Node, token: Token): Node {
        let parselet = this.getParselet(token);
        return parselet.parse(p, left, token);
    }

    getPrecedence(token: Token) {
        let parselet = this.getParselet(token);
        return parselet.getPrecedence(token);
    }

}