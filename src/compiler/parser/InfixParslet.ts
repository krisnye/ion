import { Parser } from "./Parser";
import { Token } from "../tokenizer/Token";
import { Node } from "../ast/Node";

export abstract class InfixParselet {

    abstract parse(p: Parser, left: Node, token: Token): Node
    abstract getPrecedence(token: Token): number;

}