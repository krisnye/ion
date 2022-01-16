import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Assignment } from "../ast/Assignment";

export class AssignmentParselet extends BinaryOperatorParselet {

    parse(p: Parser, id: Node, token: Token): Node {
        let { location } = token;
        let value = this.parseRight(p, token);
        return new Assignment({ location, id, value });
    }

}