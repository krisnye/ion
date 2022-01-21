import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./PrefixOperatorParselet";
import { StringLiteral } from "../ast/StringLiteral";
import { RoutingInfixParselet } from "./RoutingInfixParselet";
import { BinaryOperatorParselet } from "./BinaryOperatorParselet";
import { MemberParselet } from "./MemberParselet";
import { TerminalParselet } from "./TerminalParselet";
import { Identifier } from "../ast/Identifier";
import { AssignmentParselet } from "./AssignmentParselet";
import { GroupParselet } from "./GroupParselet";
import { CallParselet } from "./CallParselet";
import { SequenceParselet } from "./SequenceParselet";

export function createParser() {
    return new Parser({
        Float: new TerminalParselet(FloatLiteral, "value"),
        Integer: new TerminalParselet(IntegerLiteral, "value"),
        String: new TerminalParselet(StringLiteral, "value"),
        Operator: new PrefixOperatorParselet(),
        Id: new TerminalParselet(Identifier, "name"),
        OpenParen: new GroupParselet("CloseParen"),
    },
    {
        Operator: new RoutingInfixParselet(
            {
                ".": new MemberParselet(),
                ",": new SequenceParselet(),
                "=": new AssignmentParselet(),
                "+=": new AssignmentParselet(),
                "-=": new AssignmentParselet(),
                "**=": new AssignmentParselet(),
                "*=": new AssignmentParselet(),
                "/=": new AssignmentParselet(),
                "%=": new AssignmentParselet(),
                "<<=": new AssignmentParselet(),
                ">>=": new AssignmentParselet(),
                "^=": new AssignmentParselet(),
                "&=": new AssignmentParselet(),
                "|=": new AssignmentParselet(),
                "&&=": new AssignmentParselet(),
                "||=": new AssignmentParselet(),
            },
            new BinaryOperatorParselet(),
        ),
        OpenParen: new CallParselet("CloseParen"),
        OpenBracket: new MemberParselet("CloseBracket"),
    })
}