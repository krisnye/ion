import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { Parser } from "./Parser";
import { PrefixOperatorParselet } from "./parselets/PrefixOperatorParselet";
import { StringLiteral } from "../ast/StringLiteral";
import { BinaryOperatorParselet } from "./parselets/BinaryOperatorParselet";
import { MemberParselet } from "./parselets/MemberParselet";
import { TerminalParselet } from "./parselets/TerminalParselet";
import { Identifier } from "../ast/Identifier";
import { GroupParselet } from "./parselets/GroupParselet";
import { CallParselet } from "./parselets/CallParselet";
import { IfParselet } from "./parselets/IfParselet";
import { ReturnParselet } from "./parselets/ReturnParselet";
import { ClassParselet } from "./parselets/ClassParselet";
import { ForParselet } from "./parselets/ForParselet";
import { BlockParselet } from "./parselets/BlockParselet";
import { OutlineStringParselet } from "./parselets/OutlineStringParselet";

export function createParser() {
    return new Parser({
        Float: new TerminalParselet(FloatLiteral, "value"),
        Integer: new TerminalParselet(IntegerLiteral, "value"),
        String: new TerminalParselet(StringLiteral, "value"),
        Operator: new PrefixOperatorParselet(),
        Id: new TerminalParselet(Identifier, "name"),
        EscapedId: new TerminalParselet(Identifier, "name"),
        If: new IfParselet(),
        For: new ForParselet(),
        Class: new ClassParselet(),
        Return: new ReturnParselet(),
        OpenParen: new GroupParselet("CloseParen", true),
        OpenBracket: new GroupParselet("CloseBracket", true),
        Indent: new BlockParselet(),
        OutlineString: new OutlineStringParselet(),
    },
    {
        Operator: new BinaryOperatorParselet(),
        OpenParen: new CallParselet("CloseParen"),
        OpenBracket: new MemberParselet("CloseBracket"),
    })
}