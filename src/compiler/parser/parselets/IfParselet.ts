import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { Conditional } from "../../pst/Conditional";
import { SourceLocation } from "../../SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";

export class IfParselet extends PrefixParselet {

    parse(p: Parser, ifToken: Token): Node {
        let test = p.parseExpression();
        let consequent = p.parseBlock();
        let alternate: Node | null = null;
        p.eol();
        if (p.maybeConsume(tokenTypes.Else.name)) {
            p.whitespace();
            let elseIfToken = p.maybeConsume(tokenTypes.If.name)
            if (elseIfToken) {
                p.whitespace();
                alternate = this.parse(p, elseIfToken);
            }
            else {
                alternate = p.parseBlock();
            }
        }
        return new Conditional({
            location: SourceLocation.merge(ifToken.location, test.location),
            test,
            consequent,
            alternate,
        })
    }

}