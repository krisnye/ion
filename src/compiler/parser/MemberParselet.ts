import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";
import { SourceLocation } from "../ast/SourceLocation";
import { tokenTypes } from "../tokenizer/TokenType";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { Member } from "../ast/Member";
import { infixPrecedence } from "./operators";

export class MemberParselet extends BinaryOperatorParselet {

    computed: boolean;

    constructor(computed: boolean) {
        super();
        this.computed = computed;
    }

    parse(p: Parser, object: Node, open: Token): Node {
        let { computed } = this;
        let property = p.parseExpression(computed ? 0 : infixPrecedence[open.value]!);
        //  if it's computed we consume the closing "]" otherwise
        //  otherwise this is just implicitly closed by the property
        let close = computed ? p.consume(tokenTypes.Close.name, "]") : property;
        return new Member({
            location: SourceLocation.merge(object.location, close.location),
            object,
            property,
            computed,
        });
    }

}