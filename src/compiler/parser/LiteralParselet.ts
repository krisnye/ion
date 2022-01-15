import { Node } from "../ast/Node";
import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { PrefixParselet } from "./PrefixParselet";
import { Literal } from "../ast/Literal";

export class LiteralParselet extends PrefixParselet {

    literalClass: typeof Literal;

    constructor(literalClass: typeof Literal) {
        super();
        this.literalClass = literalClass;
    }

    parse(p: Parser, token: Token) {
        let { value, location } = token;
        return new this.literalClass({ location, value });
    }

}