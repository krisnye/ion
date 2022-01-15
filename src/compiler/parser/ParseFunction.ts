import { Node } from "../ast/Node";
import { Parser } from "./Parser";

export type ParseFunction = (p: Parser) => Node | void
