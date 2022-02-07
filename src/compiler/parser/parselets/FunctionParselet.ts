import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Function } from "../../pst/Function";
import { Node } from "../../Node";
import { Parser } from "../Parser";
import { SourceLocation } from "../../SourceLocation";
import { Token } from "../../Token";
import { tokenTypes } from "../../tokenizer/TokenType";

export class FunctionParselet extends BinaryOperatorParselet {

    parse(p: Parser, parameters: Node, operator: Token): Node {
        let body = p.peek(tokenTypes.Eol.name) ? p.parseBlock() : this.parseRight(p, operator);
        return new Function({
            location: SourceLocation.merge(parameters.location, body.location),
            parameters,
            body,
        });
    }

}