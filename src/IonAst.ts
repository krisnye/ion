
export class Position {
    line: number
    column: number
    constructor(line: number, column: number) {
        this.line = line        // >= 1
        this.column = column    // >= 0
    }
}
export class SourceLocation {
    start: Position
    end: Position
    source: string | null
    constructor(start: Position, end: Position, source: string) {
        this.start = start
        this.end = end
        this.source = source
    }
}
export abstract class Node {
    type: string
    location: SourceLocation | null
    constructor(properties?: any) {
        this.type = this.constructor.name
        if (properties != null) {
            for (const key in properties) {
                (this as any)[key] = properties[key]
            }
        }
    }
}

export class TypeDeclaration extends Node implements Declaration {
    id: Id
    value: Type
}
export class Variable extends Node {
    id: Id
    assignable: boolean
    valueType: Type | null
}
export class VariableDeclaration extends Variable implements Declaration {
    init: Expression | null
}
export class VariableBinding extends Variable {
    typeVariable: boolean
    canonicalTypeString: string | null
    constructor(properties:{assignable?:boolean,id:Id,typeVariable?:boolean,valueType?:Type|null,location?:SourceLocation|null}) {
        super(properties)
        if (this.assignable == null)
            this.assignable = false
        if (this.typeVariable == null)
            this.typeVariable = false
        if (this.canonicalTypeString == null)
            this.canonicalTypeString = null
    }
}
export abstract class Scope extends Node {
    //  from local variable name to a canonical type name
    //  the canonical types will be stored at the root level
    variables: {[name: string]: VariableBinding} = {}
}
export class Module extends Scope {
    imports: ImportDeclarations | null
    declarations: Declaration[]
    exports: Declaration | Declaration[]
}
export class ClassDeclaration extends Scope implements Declaration {
    valueType: boolean
    id: Id
    typeParameters: Parameter[]
    baseClasses: Id[]
    properties: VariableDeclaration[]
}
export class BlockStatement extends Scope implements Statement {
    body: Statement[]
}
export class ForInStatement extends Scope implements Statement {
    left: Pattern
    right: Expression
    body: BlockStatement
}

export interface Pattern extends Node {}
export interface Expression extends Node {}
export interface Statement extends Node {}
export interface Declaration extends Node {}
export class Id extends Node {
    name: string
}
export class Literal extends Node implements Pattern {
    value: string | number | boolean | null
}
export class CallExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
}
export class Parameter extends Node {
    pattern: Pattern
    valueType: Type
}
export class ImportDeclarations extends Node {
    declarations: ImportSubDeclaration[]
}
export class ImportSubDeclaration extends Node {
    relative: number
    path: (Id | Literal)[]
    children: ImportSubDeclaration[] | null
    as: Id | null
}

export class DotExpression extends Node implements Expression {
}
export class MemberExpression extends Node implements Expression {
    object: Expression
    property: Expression
    computed: boolean
}

////////////////////////////////////////////////////////////////////////////////
//  Functions
////////////////////////////////////////////////////////////////////////////////
export class FunctionExpression extends Scope implements Expression {
    id: Id | null
    params: Parameter[]
    body: BlockStatement
}
export class ReturnStatement extends Node implements Statement {
    argument: Expression
}
export class AssignmentStatement extends Node implements Statement {
    left: Pattern
    right: Expression
}

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface Type extends Node {}
export class TypeReference extends Node implements Type {
    id: Id
}
export class ConstrainedType extends Scope implements Type {
    baseType: Id
    constraint: Expression
}