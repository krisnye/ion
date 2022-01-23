import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../ast/SourceLocation";
import { For } from "../../ast/For";
import { tokenTypes } from "../../tokenizer/TokenType";

export class ForParselet extends PrefixParselet {

    parse(p: Parser, forToken: Token): Node {
        let id = p.parseExpression();
        p.consume(tokenTypes.In.name);
        let value = p.parseExpression();
        let body = p.parseBlock();
        return new For({
            location: SourceLocation.merge(forToken.location, value.location),
            id,
            value,
            body,
        })
    }

}