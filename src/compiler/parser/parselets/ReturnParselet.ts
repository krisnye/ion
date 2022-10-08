import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { Return } from "../../ast/Return";
import { Expression } from "../../ast/Expression";

export class ReturnParselet extends PrefixParselet {

    parse(p: Parser, returnToken: Token): Node {
        let value = p.parseExpression();
        return new Return({
            location: SourceLocation.merge(returnToken.location, value.location),
            returnToken,
            value: value as Expression
        })
    }

}