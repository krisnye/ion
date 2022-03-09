import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Call } from "../../pst/Call";
import { Sequence } from "../../pst/Sequence";

export class CallParselet extends BinaryOperatorParselet {

    closeTokenType: keyof typeof tokenTypes;

    constructor(closeToken: keyof typeof tokenTypes) {
        super();
        this.closeTokenType = closeToken;
    }

    parse(p: Parser, callee: Node, open: Token): Node {
        let args = p.peek(this.closeTokenType) ? null : p.parseExpression();
        let close = p.consume(this.closeTokenType);
        return new Call({
            location: SourceLocation.merge(callee.location, close.location),
            callee,
            args,
        });
    }

}