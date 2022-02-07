import { FloatLiteral } from "../pst/FloatLiteral";
import { IntegerLiteral } from "../pst/IntegerLiteral";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./parselets/PrefixOperatorParselet";
import { StringLiteral } from "../pst/StringLiteral";
import { BinaryOperatorParselet } from "./parselets/BinaryOperatorParselet";
import { MemberParselet } from "./parselets/MemberParselet";
import { TerminalParselet } from "./parselets/TerminalParselet";
import { Identifier } from "../pst/Identifier";
import { GroupParselet } from "./parselets/GroupParselet";
import { CallParselet } from "./parselets/CallParselet";
import { IfParselet } from "./parselets/IfParselet";
import { ReturnParselet } from "./parselets/ReturnParselet";
import { ClassParselet } from "./parselets/ClassParselet";
import { ForParselet } from "./parselets/ForParselet";
import { BlockParselet } from "./parselets/BlockParselet";

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
        OpenParen: new GroupParselet("CloseParen"),
        Indent: new BlockParselet(),
    },
    {
        Operator: new BinaryOperatorParselet(),
        // Operator: new RoutingInfixParselet(
        //     {
        //         ",": new SequenceParselet(),
        //         ":": new VariableParselet(),
        //         "=>": new FunctionParselet(),
        //         "=": new AssignmentParselet(),
        //         "+=": new AssignmentParselet(),
        //         "-=": new AssignmentParselet(),
        //         "**=": new AssignmentParselet(),
        //         "*=": new AssignmentParselet(),
        //         "/=": new AssignmentParselet(),
        //         "%=": new AssignmentParselet(),
        //         "<<=": new AssignmentParselet(),
        //         ">>=": new AssignmentParselet(),
        //         "^=": new AssignmentParselet(),
        //         "&=": new AssignmentParselet(),
        //         "|=": new AssignmentParselet(),
        //         "&&=": new AssignmentParselet(),
        //         "||=": new AssignmentParselet(),
        //     },
        //     new BinaryOperatorParselet(),
        // ),
        OpenParen: new CallParselet("CloseParen"),
        OpenBracket: new MemberParselet("CloseBracket"),
    })
}