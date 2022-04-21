import { Parser } from "../Parser";
import { Token } from "../../Token";
import { PrefixParselet } from "../PrefixParselet";
import { Node } from "../../Node";

function isNodeClass(node): node is typeof Node {
    return node.prototype instanceof Node;
}

export class TerminalParselet<T extends typeof Node | ((props) => Node)> extends PrefixParselet {

    expressionClass: typeof Node | ((props) => Node);
    valueProperty: string;

    constructor(literalClass: T, valueProperty: string) {
        super();
        this.expressionClass = literalClass;
        this.valueProperty = valueProperty;
    }

    parse(p: Parser, token: Token) {
        let { value, location } = token;
        if (isNodeClass(this.expressionClass)) {
            return new this.expressionClass({ location, [this.valueProperty]: value });
        }
        else {
            return this.expressionClass({ location, [this.valueProperty]: value });
        }
    }

}