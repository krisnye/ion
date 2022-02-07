import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { For } from "../../pst/For";
import { tokenTypes } from "../../tokenizer/TokenType";

export class ForParselet extends PrefixParselet {

    parse(p: Parser, forToken: Token): Node {
        let id = p.parseExpression();
        p.whitespace();
        p.consume(tokenTypes.In.name);
        p.whitespace();
        let value = p.parseExpression();
        p.whitespace();
        let body = p.parseBlock();
        return new For({
            location: SourceLocation.merge(forToken.location, value.location),
            id,
            value,
            body,
        })
    }

}