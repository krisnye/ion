import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../ast/SourceLocation";
import { Return } from "../../ast/Return";

export class ReturnParselet extends PrefixParselet {

    parse(p: Parser, returnToken: Token): Node {
        let value = p.parseExpression();
        return new Return({
            location: SourceLocation.merge(returnToken.location, value.location),
            value,
        })
    }

}