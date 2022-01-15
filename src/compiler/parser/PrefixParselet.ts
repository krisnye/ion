import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Expression } from "../ast/Expression";

export abstract class PrefixParselet {

    abstract parse(p: Parser, token: Token): Expression

}