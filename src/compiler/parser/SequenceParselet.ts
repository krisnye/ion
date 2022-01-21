import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Sequence } from "../ast/Sequence";

export class SequenceParselet extends BinaryOperatorParselet {

    parse(p: Parser, left: Node, operator: Token): Node {
        let right = this.parseRight(p, operator);
        return Sequence.merge(left, right);
    }

}