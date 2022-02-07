import { Parser } from "../Parser";
import { Token } from "../../Token";
import { PrefixParselet } from "../PrefixParselet";
import { Node } from "../../Node";

export class TerminalParselet<T extends typeof Node> extends PrefixParselet {

    expressionClass: typeof Node;
    valueProperty: string;

    constructor(literalClass: T, valueProperty: string) {
        super();
        this.expressionClass = literalClass;
        this.valueProperty = valueProperty;
    }

    parse(p: Parser, token: Token) {
        let { value, location } = token;
        return new this.expressionClass({ location, [this.valueProperty]: value });
    }

}