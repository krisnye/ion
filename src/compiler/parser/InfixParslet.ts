import { Parser } from "./Parser";
import { Token } from "../Token";
import { Node } from "../Node";

export abstract class InfixParselet {

    abstract parse(p: Parser, left: Node, token: Token): Node
    abstract getPrecedence(token: Token): number | undefined;

}