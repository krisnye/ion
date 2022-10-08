import { Node } from "./Node"
import { SourceLocation } from "./SourceLocation"

export enum SemanticTokenType {
    comment = "comment",
    string = "string",
    keyword = "keyword",
    number = "number",
    regexp = "regexp",
    operator = "operator",
    namespace = "namespace",
    type = "type",
    struct = "struct",
    class = "class",
    interface = "interface",
    enum = "enum",
    typeParameter = "typeParameter",
    function = "function",
    member = "member",
    macro = "macro",
    variable = "variable",
    parameter = "parameter",
    property = "property",
    label = "label",
}

export enum SemanticModifier {
    declaration = "declaration",
    documentation = "documentation",
    readonly = "readonly",
    static = "static",
    abstract = "abstract",
    deprecated = "deprecated",
    modification = "modification",
    async = "async",
}

export class SemanticHighlight {

    public readonly line: number;
    public readonly column: number;
    public readonly length: number;
    public readonly tokenType: SemanticTokenType;
    public readonly modifiers: SemanticModifier[];

    constructor(
        line: number,
        column: number,
        length: number,
        tokenType: SemanticTokenType,
        ...modifiers: SemanticModifier[]
    ) {
        this.line = line;
        this.column = column;
        this.length = length;
        this.tokenType = tokenType;
        this.modifiers = modifiers;
    }

    static create(
        node: SourceLocation,
        tokenType: SemanticTokenType,
        ...modifiers: SemanticModifier[]
    ) {
        let line = node.start.line - 1;
        let column = node.start.column - 2;
        //  TODO: Calculate actual length correctly as this won't work for multiple lines.
        let length = node.finish.column - node.start.column;
        return new SemanticHighlight(line, column, length, tokenType, ...modifiers);
    }
}
