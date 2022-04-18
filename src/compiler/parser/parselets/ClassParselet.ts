import { Parser } from "../Parser";
import { Token } from "../../Token";
import { Node } from "../../Node";
import { PrefixParselet } from "../PrefixParselet";
import { SourceLocation } from "../../SourceLocation";
import { SemanticError } from "../../SemanticError";
import { Class } from "../../pst/Class";
import { tokenTypes } from "../../tokenizer/TokenType";
import { Variable } from "../../ast/Variable";
import { Identifier } from "../../ast/Identifier";

export class ClassParselet extends PrefixParselet {

    parse(p: Parser, classToken: Token): Node {
        let id = p.parseExpression();
        if (!(id instanceof Identifier)) {
            throw new SemanticError(`Expected identifier`, id);
        }
        let _extends: Node | null = null;
        if (p.maybeConsume(tokenTypes.Extends.name)) {
            p.whitespace();
            _extends = p.parseExpression();
        }
        let block = p.maybeParseBlock();
        let location = block ? SourceLocation.merge(classToken.location, block.location) : classToken.location;
        return new Variable({
            location,
            meta: [],
            constant: true,
            id,
            value: new Class({
                location: block ? SourceLocation.merge(classToken.location, block.location) : classToken.location,
                id,
                constant: true,
                extends: _extends,
                nodes: block?.nodes ?? [],
            })
        });
    }

}