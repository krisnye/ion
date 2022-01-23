import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { PrefixParselet } from "../PrefixParselet";
import { Conditional } from "../../ast/Conditional";
import { SourceLocation } from "../../ast/SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";

export class IfParselet extends PrefixParselet {

    parse(p: Parser, ifToken: Token): Node {
        let test = p.parseExpression();
        let consequent = p.parseBlock();
        let alternate: Node | null = null;
        if (p.maybeConsume(tokenTypes.Else.name)) {
            p.maybeConsume(tokenTypes.Whitespace.name);
            let elseIfToken = p.maybeConsume(tokenTypes.If.name)
            if (elseIfToken) {
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