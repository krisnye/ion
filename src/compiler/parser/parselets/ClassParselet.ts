import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { Identifier } from "../../ast/Identifier";
import { SemanticError } from "../../SemanticError";
import { Class } from "../../pst/Class";
import { tokenTypes } from "../../tokenizer/TokenType";

export class ClassParselet extends PrefixParselet {

    parse(p: Parser, classToken: Token): Node {
        let id = p.parseExpression();
        if (!(id instanceof Identifier)) {
            throw new SemanticError(`Expected identifier`, id);
        }
        let _extends: Node | Node[] = [];
        if (p.maybeConsume(tokenTypes.Extends.name)) {
            p.whitespace();
            _extends = p.parseExpression();
        }
        let block = p.maybeParseBlock();
        return new Class({
            location: block ? SourceLocation.merge(classToken.location, block.location) : classToken.location,
            id,
            extends: _extends,
            nodes: block?.nodes ?? [],
        })
    }

}