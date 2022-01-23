import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./parselets/PrefixOperatorParselet";
import { StringLiteral } from "../ast/StringLiteral";
import { RoutingInfixParselet } from "./parselets/RoutingInfixParselet";
import { BinaryOperatorParselet } from "./parselets/BinaryOperatorParselet";
import { MemberParselet } from "./parselets/MemberParselet";
import { TerminalParselet } from "./parselets/TerminalParselet";
import { Identifier } from "../ast/Identifier";
import { AssignmentParselet } from "./parselets/AssignmentParselet";
import { GroupParselet } from "./parselets/GroupParselet";
import { CallParselet } from "./parselets/CallParselet";
import { SequenceParselet } from "./parselets/SequenceParselet";
import { IfParselet } from "./parselets/IfParselet";
import { ReturnParselet } from "./parselets/ReturnParselet";
import { ClassParselet } from "./parselets/ClassParselet";
import { VariableParselet } from "./parselets/VariableParselet";
import { ForParselet } from "./parselets/ForParselet";
import { FunctionParselet } from "./parselets/FunctionParselet";

export function createParser() {
    return new Parser({
        Float: new TerminalParselet(FloatLiteral, "value"),
        Integer: new TerminalParselet(IntegerLiteral, "value"),
        String: new TerminalParselet(StringLiteral, "value"),
        Operator: new PrefixOperatorParselet(),
        Id: new TerminalParselet(Identifier, "name"),
        If: new IfParselet(),
        For: new ForParselet(),
        Class: new ClassParselet(),
        Return: new ReturnParselet(),
        OpenParen: new GroupParselet("CloseParen")
    },
    {
        Operator: new RoutingInfixParselet(
            {
                ".": new MemberParselet(),
                ",": new SequenceParselet(),
                ":": new VariableParselet(),
                "=>": new FunctionParselet(),
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