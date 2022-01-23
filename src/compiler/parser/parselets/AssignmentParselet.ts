import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Assignment } from "../../ast/Assignment";
import { Call } from "../../ast/Call";
import { SourceLocation } from "../../ast/SourceLocation";
import { Identifier } from "../../ast/Identifier";

export class AssignmentParselet extends BinaryOperatorParselet {

    parse(p: Parser, id: Node, operator: Token): Node {
        let { location } = operator;
        let value = this.parseRight(p, operator);
        if (operator.source.length > 1 && operator.source.endsWith("=")) {
            value = new Call({
                location: SourceLocation.merge(id.location, value.location),
                callee: new Identifier({ location, name: operator.source.slice(0, -1) }),
                arguments: [id, value]
            })
        }
        return new Assignment({
            location: SourceLocation.merge(id.location, value.location),
            id,
            value
        });
    }

}