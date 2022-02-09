import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { Identifier } from "../../pst/Identifier";
import { SemanticError } from "../../SemanticError";
import { Class } from "../../pst/Class";

export class ClassParselet extends PrefixParselet {

    parse(p: Parser, classToken: Token): Node {
        let id = p.parseExpression();
        if (!(id instanceof Identifier)) {
            throw new SemanticError(`Expected identifier`, id);
        }
        // todo: maybe get extends... values.
        let block = p.maybeParseBlock();
        return new Class({
            location: block ? SourceLocation.merge(classToken.location, block.location) : classToken.location,
            id,
            extends: [],
            nodes: block?.nodes ?? [],
        })
    }

}