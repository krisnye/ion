import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Expression } from "../ast/Expression";
import { InfixParselet } from "./InfixParslet";

export class RoutingInfixParselet extends InfixParselet {

    valueParselets: { [value: string]: InfixParselet | undefined };
    defaultParselet: InfixParselet;

    constructor(
        valueParselets: { [value: string]: InfixParselet | undefined },
        defaultParselet: InfixParselet,
    ) {
        super();
        this.valueParselets = valueParselets;
        this.defaultParselet = defaultParselet;
    }

    parse(p: Parser, left: Expression, token: Token): Expression {
        let { value } = token;
        let parselet = this.valueParselets[value] ?? this.defaultParselet;
        return parselet.parse(p, left, token);
    }

}