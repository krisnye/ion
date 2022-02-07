import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";

export class BlockParselet extends PrefixParselet {

    parse(p: Parser, indentToken: Token): Node {
        return p.parseBlock(indentToken);
    }

}