import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { BinaryOperatorParselet } from "../parselets/BinaryOperatorParselet";
import { Variable } from "../../ast/Variable";
import { SourceLocation } from "../../ast/SourceLocation";

export class VariableParselet extends BinaryOperatorParselet {

    parse(p: Parser, id: Node, operator: Token): Node {
        let type = this.parseRight(p, operator);
        return new Variable({
            location: SourceLocation.merge(id.location, type.location),
            id,
            type,
            value: null,
        })
    }

}