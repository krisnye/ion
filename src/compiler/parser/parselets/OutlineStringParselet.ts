import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SemanticError } from "../../SemanticError";
import { tokenTypes } from "../../tokenizer/TokenType";
import { StringLiteral } from "../../pst/StringLiteral";
import { SourceLocation } from "../../SourceLocation";

export class OutlineStringParselet extends PrefixParselet {

    parse(p: Parser, outlineString: Token): Node {
        p.eol();
        let indent = p.peek(tokenTypes.Indent.name)
        if (indent == null) {
            throw new SemanticError(`Expected indented content to follow outline string`, outlineString);
        }
        let b = new Array<string>();
        let depth = 0;
        let last = indent;
        while (!p.done()) {
            let next = p.consume();
            switch (next.type) {
                case tokenTypes.Indent.name:
                    depth++;
                    break;
                case tokenTypes.Outdent.name:
                    depth--;
                    break;
                default:
                    if (last.type === tokenTypes.Eol.name) {
                        for (let i = 1; i < depth; i++) {
                            b.push(indent.source);
                        }
                    }
                    b.push(next.source);
                    last = next;
            }
            if (depth === 0) {
                break;
            }
        }

        return new StringLiteral({
            location: SourceLocation.merge(outlineString.location, last.location),
            value: b.join(""),
        })
    }

}