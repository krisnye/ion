import { Node } from "./ast/Node";
import { SourceLocation } from "./ast/SourceLocation";

export class SemanticError extends Error {

    locations: SourceLocation[];

    constructor(message: string, ...nodes: (Node | SourceLocation)[]) {
        super(message);
        this.name = this.constructor.name;
        this.locations = nodes.map(node => node instanceof Node ? node.location : node);
    }

}