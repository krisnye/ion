import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { SourceLocation } from "../../SourceLocation";
import { Sequence } from "../../pst/Sequence";
import { Group } from "../../pst/Group";

export class GroupParselet extends PrefixOperatorParselet {

    closeToken: string;

    constructor(close: string) {
        super();
        this.closeToken = close;
    }

    parse(p: Parser, open: Token): Node {
        let value = this.parseArgument(p, open, 0);
        let close = p.consume(this.closeToken);
        let location = SourceLocation.merge(open.location, close.location);
        return new Group({
            location,
            value,
        })
    }

}