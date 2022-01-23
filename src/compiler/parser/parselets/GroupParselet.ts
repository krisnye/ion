import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { SourceLocation } from "../../ast/SourceLocation";
import { Sequence } from "../../ast/Sequence";

export class GroupParselet extends PrefixOperatorParselet {

    closeToken: string;

    constructor(close: string) {
        super();
        this.closeToken = close;
    }

    parse(p: Parser, open: Token): Node {
        let value = this.parseArgument(p, open, 0);
        let close = p.consume(this.closeToken);
        let location = SourceLocation.merge(open.location, close.location);
        //  we use a Sequence with one node instead of dedicated Group node
        //  the Sequence will be removed later, but it helps during some semantic analysis.
        //  for instance, we want to know if -1 ** 2 was properly disambiguated.
        if (value instanceof Sequence) {
            return value.patch({ location });
        }
        else {
            return new Sequence({ location, nodes: [value] });
        }
    }

}