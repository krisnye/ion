
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
    // __path: string[]        //  set by Input#Node_SetPathAndAncestors
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
    getVariable(ancestors: object[], name: string): VariableBinding | null {
        for (let scope of getScopes(this, ancestors)) {
            let variable = scope._variables[name]
            if (variable != null)
                return variable
        }
        return null
    }
    toString() {
        return `${this.className}()`
    }
    toDebugString() {
        return `${this.className}(${this})`
    }
}
//  we have to define these here as non-enumerable to prevent JSON.stringify
//  creating a circular reference.
// Object.defineProperties(Node.prototype, {
//     __path: {value:null,writable:true,enumerable:false},
//     __ancestors: { value: null, writable: true, enumerable: false }
// })

export class VariableDeclaration extends Node implements Declaration, Expression {
    id: Id
    assignable: boolean
    type?: TypeExpression
    value: Expression | null
    getDependencies() {
        if (this.value)
            return [this.value]
        else
            return []
    }
    toString() {
        return `${this.assignable ? 'var' : 'let'} ${this.id.name}: ${this.type}`
    }
}
export class VariableBinding {
    id: Id
    value: Expression
    assignable: boolean
    constructor(id: Id, value:Expression, assignable: boolean = false) {
        this.id = id
        this.value = value
        this.assignable = assignable
    }
}
export abstract class Scope extends Node {
    //  from local variable name to a canonical type name
    //  the canonical types will be stored at the root level
    _variables: { [name: string]: VariableBinding } = {}
    addVariable(variable: VariableBinding) {
        let { name } = variable.id
        if (this._variables[name] != null)
            variable.id.throwSemanticError(`Cannot redeclare '${name}'`)
        this._variables[name] = variable
    }
}

export class Namespace extends Scope {
    path: string[]
    get name() { return this.path[this.path.length - 1] }
    // should have actual name property.

    namespaces: { [path: string]: Namespace }
}

export class Assembly extends Namespace {
    options: { input: string, output: string }
    _expressionDependencies: [Expression, Expression][] = Object.assign([], {
        toJSON() {
            // for debugging
            return this.map(([a, b]: [Expression, Expression]) => {
                return (a != null ? a.toDebugString() : "null") + " -> " + (b != null ? b.toDebugString() : "null")
            })
        }
    })
}

export class Module extends Namespace {
    id: Id
    imports: ImportDeclaration[]
    declarations: Declaration[]
    exports: Declaration | Declaration[]
    // calculated temporarily as part of identifier resolution
    unresolvedReferences: {[name: string]: Reference} = {}
}
export class ClassDeclaration extends Scope implements Declaration, TypeExpression {
    type = new CanonicalReference("ion.Type")
    isStructure: boolean
    id: Id
    templateParameters: Parameter[]
    baseClasses: TypeExpression[]
    declarations: Declaration[]
    getDependencies(ancestors: object[]) {
        return this.baseClasses
    }
    resolve(ancestors: object[], path: string[]) {
        console.log('class resolve: ' + path.join('.'))
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

export interface Pattern extends Node {
    getIds(): Id[]
}
export interface Expression extends Node {
    type?: TypeExpression
    getDependencies(ancestors: object[]) : Expression[]
    resolve?: (ancestors: object[], path: string[]) => Expression | void
}
export function isExpression(node:any): node is Expression {
    return node != null && node.getDependencies != null
}
export type BinaryOperator = "+" | "-" | "*" | "/" | "%" |  "<" | ">" | "<=" | ">=" | "==" | "!=" | "is" | "and" | "or" | "xor"
export class BinaryExpression extends Node implements Expression {
    left: Expression
    operator: string
    right: Expression
    getDependencies(ancestors: object[]): Expression[] {
        return [this.left, this.right]
    }
}
export type UnaryOperator = "+" | "-" | "not"
export class UnaryExpression extends Node implements Expression {
    operator: string
    argument: Expression
    getDependencies(ancestors: object[]): Expression[] {
        return [this.argument]
    }
}
export interface Statement extends Node {}
export interface Declaration extends Node, Expression {}
export class Id extends Node implements Expression, Pattern {
    name: string
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    getIds() {
        return [this]
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
            return [variable.value]
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
        return [this.callee, ...this.arguments]
    }
    toString() {
        return `${this.callee}(${this.arguments.join(',')})`
    }
}
export class Parameter extends Node implements Expression {
    pattern: Pattern
    type?: TypeExpression
    default: Expression | null
    getDependencies(ancestors: object[]) {
        return []
    }
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
    parameters: Parameter[]
    body: BlockStatement
    getDependencies(ancestors: object[]): Expression[] {
        //  make ancestors correct for our patterns by including this
        return (<Expression[]>[]).concat(...this.parameters.map(p => p.pattern.getIds()))
    }
    toString() {
        return `${this.id || ''}(${this.parameters.join(',')}) => ${this.body}`
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
export class Literal extends Node implements Expression {
    value: string | number | boolean | null
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return JSON.stringify(this.value)
    }
}

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface TypeExpression extends Expression {
    type?: CanonicalReference
}
export class CanonicalReference extends Node implements TypeExpression {
    path: string[]
    constructor(path: string | string[]) {
        super()
        if (typeof path == 'string')
            path = path.split('.')
        this.path = path
    }
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return this.path.join('.')
    }
    toJSON() {
        return this.toString()
    }
}
export class LiteralType extends Node implements TypeExpression {
    literal: Literal
    type = new CanonicalReference("ion.Type")
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return `type ${this.literal}`
    }
}
export class TemplateReference extends Node implements TypeExpression {
    type = new CanonicalReference("ion.Type")
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
    type = new CanonicalReference("ion.Type")
    baseType: Reference
    constraint: Expression
    getDependencies(ancestors: object[]) {
        return [this.baseType, this.constraint]
    }
    toString() {
        return `${this.baseType} ${this.constraint}`
    }
}
export class FunctionType extends Scope implements TypeExpression {
    type = new CanonicalReference("ion.Type")
    parameters: Parameter[]
    returnType: TypeExpression
    getDependencies(ancestors: object[]) {
        return [...this.parameters, this.returnType]
    }
    toString() {
        return `(${this.parameters.join(',')}) => ${this.returnType}`
    }
}
export class UnionType extends Node implements TypeExpression {
    type = new CanonicalReference("ion.Type")
    types: TypeExpression[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('|')
    }
}
export class IntersectionType extends Node implements TypeExpression {
    type = new CanonicalReference("ion.Type")
    types: TypeExpression[]
    getDependencies(ancestors: object[]) {
        return this.types
    }
    toString() {
        return this.types.join('&')
    }
}

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