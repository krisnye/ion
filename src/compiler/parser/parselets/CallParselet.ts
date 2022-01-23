import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { SourceLocation } from "../../ast/SourceLocation";
import { tokenTypes } from "../../tokenizer/TokenType";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Call } from "../../ast/Call";
import { Sequence } from "../../ast/Sequence";

export class CallParselet extends BinaryOperatorParselet {

    closeTokenType: keyof typeof tokenTypes;

    constructor(closeToken: keyof typeof tokenTypes) {
        super();
        this.closeTokenType = closeToken;
    }

    parse(p: Parser, callee: Node, open: Token): Node {
        let args = p.parseExpression();
        let close = p.consume(this.closeTokenType);
        return new Call({
            location: SourceLocation.merge(callee.location, close.location),
            callee,
            arguments: args instanceof Sequence ? args.nodes : [args],
        });
    }

}