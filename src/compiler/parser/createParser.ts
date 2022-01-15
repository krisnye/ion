import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { LiteralParselet } from "./LiteralParselet";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { StringLiteral } from "../ast/StringLiteral";
import { tokenTypes } from "../tokenizer/TokenType";
import { RoutingInfixParselet } from "./RoutingInfixParselet";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";

export function createParser() {
    return new Parser({
        [tokenTypes.Float.name]: new LiteralParselet(FloatLiteral),
        [tokenTypes.Integer.name]: new LiteralParselet(IntegerLiteral),
        [tokenTypes.String.name]: new LiteralParselet(StringLiteral),
        [tokenTypes.Operator.name]: new PrefixOperatorParselet(),
    }, {
        [tokenTypes.Operator.name]: new RoutingInfixParselet(
            {
            },
            new BinaryOperatorParselet(),
        )
    })
}