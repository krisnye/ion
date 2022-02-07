import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Member } from "../../pst/Member";
import { infixPrecedence } from "../operators";

export class MemberParselet extends BinaryOperatorParselet {

    closeTokenType: keyof typeof tokenTypes | undefined;

    constructor(closeToken?: keyof typeof tokenTypes | undefined) {
        super();
        this.closeTokenType = closeToken;
    }

    parse(p: Parser, object: Node, open: Token): Node {
        let computed = this.closeTokenType != null;
        let property = p.parseExpression(computed ? 0 : infixPrecedence[open.value]!);
        //  if it's computed we consume the closing operator "]" otherwise
        //  otherwise this is just implicitly closed by the property
        let close = computed ? p.consume(this.closeTokenType) : property;
        return new Member({
            location: SourceLocation.merge(object.location, close.location),
            object,
            property,
            computed,
        });
    }

}