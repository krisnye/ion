import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { tokenTypes } from "../../tokenizer/TokenType";
import { StringLiteral } from "../../ast/StringLiteral";
import { SourceLocation } from "../../SourceLocation";

export class OutlineStringParselet extends PrefixParselet {

    parse(p: Parser, outlineString: Token): Node {
        let b = new Array<string>();
        let last = outlineString;
        if (p.eol() > 0) {
            let indent = p.peek(tokenTypes.Indent.name);
            if (indent != null) {
                last = indent;
                let depth = 0;
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
            }
        }

        return new StringLiteral({
            location: SourceLocation.merge(outlineString.location, last.location),
            value: b.join(""),
        })
    }

}