
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
    constructor(...args: any[]) {
        this.type = this.constructor.name
        for (let properties of args) {
            if (properties != null) {
                for (const key in properties) {
                    (this as any)[key] = properties[key]
                }
            }
        }
    }
}

export class Assembly extends Node {
    name: string
    options: {input:string,output:string}
    modules: {[path:string]:Module}
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
    typeVariable: boolean | null // null means we don't know yet.
    canonicalTypeString: string | null
    constructor(properties:{assignable?:boolean,id:Id,typeVariable?:boolean|null,valueType?:Type|null,location?:SourceLocation|null}) {
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
    path: string[]
    get name() { return this.path[this.path.length-1]}
    imports: ImportDeclaration[]
    declarations: Declaration[]
    exports: ClassDeclaration | Library
    // calculated temporarily as part of identifier resolution
    unresolvedReferences: {[name: string]: Reference} = {}
}
export class Library extends Scope {
    declarations: Declaration[]
}
export class ClassDeclaration extends Scope implements Declaration, Type {
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
export interface Reference extends Node {
    id: Id
}
export class IdReference extends Id implements Reference {
    get id() { return this }
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
export class ImportDeclaration extends Node {
    path: Id[]
    as: Id
    children: ImportDeclaration[] | true | null
    relative: number
    implicit: boolean
    get pathString() { return this.path.map(step => step.name).join('.') }
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
export class TypeReference extends Node implements Type, Reference {
    id: Id
}
export class ConstrainedType extends Scope implements Type {
    baseType: Id
    constraint: Expression
}
export class FunctionType extends Scope implements Type {
    params: Parameter[]
    returnType: Type
}
export class LiteralType extends Node implements Type {
    value: Literal
}
export class UnionType extends Node implements Type {
    types: Type[]
}
export class IntersectionType extends Node implements Type {
    types: Type[]
}