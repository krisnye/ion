import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { SourceLocation } from "../../SourceLocation";
import { Group } from "../../pst/Group";

export class GroupParselet extends PrefixOperatorParselet {

    closeToken: string;
    canBeEmpty: boolean;

    constructor(close: string, canBeEmpty: boolean) {
        super();
        this.closeToken = close;
        this.canBeEmpty = canBeEmpty;
    }

    parse(p: Parser, open: Token): Node {
        let value: Node | null = null;
        if (!this.canBeEmpty || p.peek(this.closeToken) == null) {
            value = this.parseArgument(p, open, 0);
        }
        let close = p.consume(this.closeToken);
        let location = SourceLocation.merge(open.location, close.location);
        return new Group({
            location,
            value,
            open,
            close,
        })
    }

}