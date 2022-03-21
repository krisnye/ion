import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Call } from "../../pst/Call";
import { GroupParselet } from "./GroupParselet";

export class CallParselet extends BinaryOperatorParselet {

    closeTokenType: keyof typeof tokenTypes;
    groupParselet = new GroupParselet("CloseParen", true);

    constructor(closeToken: keyof typeof tokenTypes) {
        super();
        this.closeTokenType = closeToken;
    }

    parse(p: Parser, callee: Node, open: Token): Node {
        let group = this.groupParselet.parse(p, open);
        return new Call({
            location: SourceLocation.merge(callee.location, group.location),
            callee,
            args: group.value,
        });
    }

}