import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { StringLiteral } from "../ast/StringLiteral";
import { RoutingInfixParselet } from "./RoutingInfixParselet";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { MemberParselet } from "./MemberParselet";
import { TerminalParselet } from "./TerminalParselet";
import { tokenTypes } from "../tokenizer/TokenType";
import { Identifier } from "../ast/Identifier";
import { AssignmentParselet } from "./AssignmentParselet";

export function createParser() {
    return new Parser({
        [tokenTypes.Float.name]: new TerminalParselet(FloatLiteral, "value"),
        [tokenTypes.Integer.name]: new TerminalParselet(IntegerLiteral, "value"),
        [tokenTypes.String.name]: new TerminalParselet(StringLiteral, "value"),
        [tokenTypes.Operator.name]: new PrefixOperatorParselet(),
        [tokenTypes.Id.name]: new TerminalParselet(Identifier, "name"),
    },
    {
        [tokenTypes.Operator.name]: new RoutingInfixParselet(
            {
                ".": new MemberParselet(false),
                "=": new AssignmentParselet(),
            },
            new BinaryOperatorParselet(),
        ),
        [tokenTypes.Open.name]: new RoutingInfixParselet(
            {
                "[": new MemberParselet(true),
            }
        ),
    })
}