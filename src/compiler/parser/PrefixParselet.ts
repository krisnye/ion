import { Parser } from "./Parser";
import { Token } from "../Token";
import { Node } from "../Node";

export abstract class PrefixParselet {

    abstract parse(p: Parser, token: Token): Node

}