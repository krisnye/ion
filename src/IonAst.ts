
export class Position {
    line: Number
    column: Number
    constructor(line: Number, column: Number) {
        this.line = line        // >= 1
        this.column = column    // >= 0
    }
}

export class SourceLocation {
    start: Position
    end: Position
    source: String | null
    constructor(start: Position, end: Position, source: String) {
        this.start = start
        this.end = end
        this.source = source
    }
}

export class Node {
    type: String
    location: SourceLocation | null = null
    constructor(properties?: any) {
        this.type = this.constructor.name
        if (properties != null) {
            for (const key in properties) {
                (this as any)[key] = properties[key]
            }
        }
    }
}

export interface Pattern extends Node {}
export interface Expression extends Node {}
export interface Statement extends Node {}
export interface Declaration extends Node {}
export class Id extends Node {
    name: String
}
export class IdDeclaration extends Id implements Pattern {}
export class IdReference extends Id {}
export class Literal extends Node implements Pattern {
    value: String | Number | Boolean | null
}
export class VariableDeclaration extends Node implements Declaration {
    kind: "let" | "var"
    id: IdDeclaration
    valueType: Type | null
    init: Expression | null
}
export class CallExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
}
export class ClassDeclaration extends Node implements Declaration {
    kind: "class" | "struct"
    id: IdDeclaration
    typeParameters: Parameter[]
    baseClasses: IdReference[]
    variables: VariableDeclaration[]
}

export class Module extends Node {
    imports: ImportDeclarations | null
    declarations: Declaration[]
    exports: Declaration | Declaration[]
}

export class Parameter extends Node {
    pattern: Pattern
    valueType: Type
}

export class ImportDeclarations extends Node {
    declarations: ImportSubDeclaration[]
}

export class ImportSubDeclaration extends Node {
    relative: Number
    path: (Id | Literal)[]
    children: ImportSubDeclaration[] | null
    as: IdDeclaration | null
}

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface Type extends Node {}
export class TypeReference extends Node {
    id: IdReference
}
