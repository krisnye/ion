import { Parser } from "../Parser";
import { Token } from "../../tokenizer/Token";
import { Node } from "../../ast/Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../ast/SourceLocation";
import { Identifier } from "../../ast/Identifier";
import { SemanticError } from "../../SemanticError";
import { Class } from "../../ast/Class";

export class ClassParselet extends PrefixParselet {

    parse(p: Parser, classToken: Token): Node {
        let id = p.parseExpression();
        if (!(id instanceof Identifier)) {
            throw new SemanticError(`Expected identifier`, id);
        }
        // todo: maybe get extends... values.
        let block = p.parseBlock();
        return new Class({
            location: SourceLocation.merge(classToken.location, block.location),
            id,
            extends: [],
            nodes: block.nodes,
        })
    }

}