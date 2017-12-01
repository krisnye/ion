
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
    location: SourceLocation | null
    get className() { return this.constructor.name }
    constructor(...args: any[]) {
        for (let properties of args) {
            if (properties != null) {
                for (const key in properties) {
                    (this as any)[key] = properties[key]
                }
            }
        }
    }
}

export interface TypeSource {
    valueType: Type | null
}

export class Assembly extends Node {
    name: string
    options: {input:string,output:string}
    modules: {[path:string]:Module}
    _typeDependencies: [Type,Type][] = []
}

export class TypeDeclaration extends Node implements Declaration {
    id: Id
    value: Type
}
// export class Variable extends Node {
// }
export class VariableDeclaration extends Node implements Declaration {
    id: Id
    assignable: boolean
    valueType: Type | null
    init: Expression | null
}
// export class VariableBinding extends Variable {
//     get typeVariable() {
//         let a = this.id.name[0]
//         return a === a.toUpperCase()
//     }
//     _valueType: Type | null
//     canonicalTypeString: string | null
//     constructor({assignable,id,valueType}:{assignable?:boolean,id:Id,valueType?:Type|null}) {
//         super()
//         this.id = id
//         this.assignable = assignable || false
//         this.canonicalTypeString = null
//         this._valueType = valueType || null
//     }
// }
export abstract class Scope extends Node {
    //  from local variable name to a canonical type name
    //  the canonical types will be stored at the root level
    _variables: {[name: string]: Id} = {}
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
    templateParameters: Parameter[]
    baseClasses: TypeReference[]
    declarations: Declaration[]
    getDependencies(ancestors: object[]) {
        return this.baseClasses
    }
    toString() {
        return `class ${this.id.name}`
    }
}
export class BlockStatement extends Scope implements Statement {
    body: Statement[]
    toString() {
        return this.body.join(';')
    }
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
    toString() {
        let op = this.name[0].toUpperCase() == this.name[0].toLowerCase()
        return op ? "`" + this.name + "`" : this.name
    }
}
export interface Reference extends Node {
    id: Id
}
export class IdReference extends Id implements Reference {
    get id() { return this }
}
export class Literal extends Node implements Pattern {
    value: string | number | boolean | null
    toString() {
        return JSON.stringify(this.value)
    }
}
export class CallExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
    toString() {
        return `${this.callee}(${this.arguments.join(',')})`
    }
}
export class Parameter extends Node {
    pattern: Pattern
    valueType: Type
    defaultValue: Expression
    toString() {
        let b = this.pattern.toString()
        if (this.valueType != null)
            b += ':' + this.valueType
        if (this.defaultValue != null)
            b += '=' + this.defaultValue
        return b
    }
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
    toString() {
        return "."
    }
}
export class MemberExpression extends Node implements Expression {
    object: Expression
    property: Expression
    computed: boolean
    toString() {
        if (this.computed)
            return `${this.object}[${this.property}]`
        let objectString = this.object.toString()
        if (objectString == '.')
            objectString = ''
        return `${objectString}.${this.property}`
    }
}

////////////////////////////////////////////////////////////////////////////////
//  Functions
////////////////////////////////////////////////////////////////////////////////
export class FunctionExpression extends Scope implements Expression {
    id: Id | null
    params: Parameter[]
    body: BlockStatement
    toString() {
        return `${this.id || ''}(${this.params.join(',')}) => ${this.body}`
    }
}
export class ReturnStatement extends Node implements Statement {
    argument: Expression
    toString() {
        return "return " + this.argument
    }
}
export class AssignmentStatement extends Node implements Statement {
    left: Pattern
    right: Expression
    toString() {
        return this.left + " = " + this.right
    }
}

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface Type extends Node {
    getDependencies: (ancestors: object[]) => Type[]
}
export class TypeReference extends Node implements Type, Reference {
    id: Id
    getDependencies(ancestors: object[]) {
        return []
    }
    toString() {
        return this.id.name
    }
}
export class ConstrainedType extends Scope implements Type {
    baseType: TypeReference
    constraint: Expression
    getDependencies(ancestors: object[]) {
        return [this.baseType]
    }
    toString() {
        return `${this.baseType} ${this.constraint}`
    }
}
export class FunctionType extends Scope implements Type {
    params: Parameter[]
    returnType: Type
    getDependencies(ancestors: object[]) {
        return [this.returnType]
    }
    toString() {
        return `(${this.params.join(',')}) => ${this.returnType}`
    }
}
export class LiteralType extends Node implements Type {
    literal: Literal
    getDependencies(ancestors: object[]) {
        return []
    }
    toString() {
        return this.literal.toString()
    }
}
export class UnionType extends Node implements Type {
    types: Type[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('|')
    }
}
export class IntersectionType extends Node implements Type {
    types: Type[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('&')
    }
}
export const TypeClassNames = ['ClassDeclaration', 'TypeReference','ConstrainedType','FunctionType','LiteralType','UnionType','IntersectionType']
