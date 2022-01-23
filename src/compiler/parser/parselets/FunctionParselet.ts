import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Function } from "../../ast/Function";
import { Node } from "../../ast/Node";
import { Parser } from "../Parser";
import { SourceLocation } from "../../ast/SourceLocation";
import { Token } from "../../tokenizer/Token";

export class FunctionParselet extends BinaryOperatorParselet {

    parse(p: Parser, parameters: Node, operator: Token): Node {
        let body = this.parseRight(p, operator);
        return new Function({
            location: SourceLocation.merge(parameters.location, body.location),
            parameters,
            body,
        });
    }

}