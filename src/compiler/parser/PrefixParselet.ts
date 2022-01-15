import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";

export abstract class PrefixParselet {

    abstract parse(p: Parser, token: Token): Node

}