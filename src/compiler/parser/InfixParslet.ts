import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Expression } from "../ast/Expression";

export abstract class InfixParselet {

    abstract parse(p: Parser, left: Expression, token: Token): Expression
    abstract getPrecedence(token: Token): number;

}