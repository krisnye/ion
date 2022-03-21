import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { SourceLocation } from "../../SourceLocation";
import { Group } from "../../pst/Group";
import { Sequence } from "../../pst/Sequence";

export class GroupParselet extends PrefixOperatorParselet {

    closeToken: string;
    canBeEmpty: boolean;

    constructor(close: string, canBeEmpty: boolean) {
        super();
        this.closeToken = close;
        this.canBeEmpty = canBeEmpty;
    }

    parse(p: Parser, open: Token): Group {
        let value: Node | null = null;
        if (!this.canBeEmpty || p.peek(this.closeToken) == null) {
            value = this.parseArgument(p, open, 0);
        }
        let close = p.consume(this.closeToken);
        let last = close.location;
        // now let's see if we can consume an indented child block
        let outlineBlock = p.maybeParseBlock();
        if (outlineBlock != null) {
            value = Sequence.merge(value, ...outlineBlock.nodes);
            last = outlineBlock.location;
        }
        let location = SourceLocation.merge(open.location, last);
        return new Group({
            location,
            value,
            open,
            close: close,
        })
    }

}