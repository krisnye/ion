import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";
import { BinaryExpressionParselet } from "./BinaryExpressionParselet";
import { Member } from "../../ast/Member";
import { infixPrecedence } from "../operators";
import { Expression } from "../../ast/Expression";

export class MemberParselet extends BinaryExpressionParselet {

    closeTokenType: keyof typeof tokenTypes;

    constructor(closeToken: keyof typeof tokenTypes) {
        super();
        this.closeTokenType = closeToken;
    }

    parse(p: Parser, object: Expression, open: Token): Node {
        p.whitespace();
        let hasProperty = !p.peek(this.closeTokenType);
        let property = hasProperty ? p.parseExpression(0) : null;
        //  if it's computed we consume the closing operator "]" otherwise
        //  otherwise this is just implicitly closed by the property
        let close = p.consume(this.closeTokenType);
        return new Member({
            location: SourceLocation.merge(object.location, close.location),
            object,
            property: property as Expression,
        });
    }

}