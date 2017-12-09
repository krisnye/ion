
////////////////////////////////////////////////////////////////////////////////
//  Node definitions
////////////////////////////////////////////////////////////////////////////////

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
    __location: SourceLocation | null
    className: string
    constructor(...args: any[]) {
        this.className = this.constructor.name
        for (let properties of args) {
            if (properties != null) {
                for (const key in properties) {
                    (this as any)[key] = properties[key]
                }
            }
        }
    }
    throwSemanticError(message: string): never {
        let error: any = new Error(message)
        error.location = this.__location
        throw error
    }
    getVariable(ancestors: object[], name: string): Expression | null {
        for (let scope of getScopes(this, ancestors)) {
            let id = scope._variables[name]
            if (id != null)
                return id
        }
        return null
    }
}

export class Assembly extends Node {
    name: string
    options: {input:string,output:string}
    modules: {[path:string]:Module}
    _typeDependencies: [TypeExpression,TypeExpression][] = []
}

export class TypeDeclaration extends Node implements Declaration {
    id: Id
    value: TypeExpression
}
// export class Variable extends Node {
// }
export class VariableDeclaration extends Node implements Declaration {
    id: Id
    assignable: boolean
    type: TypeExpression | null
    init: Expression | null
}
export abstract class Scope extends Node {
    //  from local variable name to a canonical type name
    //  the canonical types will be stored at the root level
    _variables: {[name: string]: Id} = {}
    addVariable(id: Id) {
        let { name } = id
        if (this._variables[name] != null)
            id.throwSemanticError(`Cannot redeclare '${name}'`)
        this._variables[name] = id
    }
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
export class ClassDeclaration extends Scope implements Declaration, TypeExpression {
    isStructure: boolean
    id: Id
    templateParameters: Parameter[]
    baseClasses: TypeExpression[]
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
export interface Expression extends Node {
    value?: any
    type?: TypeExpression
    getDependencies(ancestors: object[]) : Expression[]
}
export interface Statement extends Node {}
export interface Declaration extends Node {}
export class Id extends Node implements Expression {
    name: string
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        let op = this.name[0].toUpperCase() == this.name[0].toLowerCase()
        return op ? "`" + this.name + "`" : this.name
    }
}
export class Reference extends Node implements Expression {
    id: Id
    getDependencies(ancestors: object[]): Expression[] {
        let variable = this.getVariable(ancestors, this.id.name)
        if (variable == null) {
            this.throwSemanticError(`Variable is unresolved: ${this.id.name}`)
            return []
        }
        else {
            return [variable]
        }
    }
    toString() {
        return this.id.toString()
    }
}
export class CallExpression extends Node implements Expression {
    callee: Expression
    arguments: Expression[]
    getDependencies(ancestors: object[]) {
        return [this.callee, ...arguments]
    }
    toString() {
        return `${this.callee}(${this.arguments.join(',')})`
    }
}
export class Parameter extends Node {
    pattern: Pattern
    type: TypeExpression | null
    default: Expression | null
    toString() {
        let b = this.pattern.toString()
        if (this.type != null)
            b += ':' + this.type
        if (this.default != null)
            b += '=' + this.default
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
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return "."
    }
}
export class MemberExpression extends Node implements Expression {
    object: Expression
    property: Expression
    computed: boolean
    getDependencies(ancestors: object[]) {
        return [this.object, this.property]
    }
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
    getDependencies(ancestors: object[]): Expression[] {
        console.log('FunctionExpression dependencies not implemented')
        return []
    }
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

export interface TypeExpression extends Expression {
}
export class Literal extends Node implements Pattern, TypeExpression {
    value: string | number | boolean | null
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return JSON.stringify(this.value)
    }
}
export class TemplateReference extends Node implements TypeExpression {
    reference: Reference
    arguments: Expression[]
    getDependencies(ancestors: object[]) {
        return [this.reference, ...this.arguments]
    }
    toString() {
        let value = this.reference.toString()
        if (this.arguments.length > 0)
            value += "<" + this.arguments.join(',') + ">"
        return value
    }
}
export class ConstrainedType extends Scope implements TypeExpression {
    baseType: Reference
    constraint: Expression
    getDependencies(ancestors: object[]) {
        return [this.baseType]
    }
    toString() {
        return `${this.baseType} ${this.constraint}`
    }
}
export class FunctionType extends Scope implements TypeExpression {
    params: Parameter[]
    returnType: TypeExpression
    getDependencies(ancestors: object[]) {
        return [this.returnType]
    }
    toString() {
        return `(${this.params.join(',')}) => ${this.returnType}`
    }
}
export class UnionType extends Node implements TypeExpression {
    types: TypeExpression[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('|')
    }
}
export class IntersectionType extends Node implements TypeExpression {
    types: TypeExpression[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('&')
    }
}
//  obsolete, all references are to be resolved now
// export const TypeClassNames = ['ClassDeclaration', 'Reference','TemplateReference','ConstrainedType','FunctionType','Literal','UnionType','IntersectionType']

////////////////////////////////////////////////////////////////////////////////
//  Variables, Scope, Binding
////////////////////////////////////////////////////////////////////////////////

function* getScopes(self: Node | null, ancestors: object[]) {
    if (self instanceof Scope)
        yield self
    for (let i = ancestors.length - 1; i >= 0; i--) {
        let node = ancestors[i]
        if (node instanceof Scope)
            yield node
    }
}

export const getScope = (self: Node | null, ancestors: object[]) => {
    for (let scope of getScopes(self, ancestors)) {
        return scope
    }
    throw new Error("Scope not found")
}

////////////////////////////////////////////////////////////////////////////////
//  Traversing ancestors
////////////////////////////////////////////////////////////////////////////////

export const getFirstOfType = (type: any, array: object[]) => {
    for (let element of array) {
        if (element instanceof type)
            return element
    }
    return null
}

export const getModule: (ancestors: object[]) => Module = getFirstOfType.bind(null, Module)
