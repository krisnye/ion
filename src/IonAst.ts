////////////////////////////////////////////////////////////////////////////////
//  Contains the Ion language Abstract Syntax Tree Nodes
////////////////////////////////////////////////////////////////////////////////

//                              elements    map
//  Object? {x:1, y: 2}                     x
//  Array?  [1, 2, 3, 4]                    x
//  Tuple   (x, y, z)                       x
//  Set     {a, b, c, d}        x
//  Map     {}                              x
//  CollectionLiteral
//      type: CanonicalReference('ion.Map') | CanonicalReference('ion.Array') | CanonicalReference('ion.Object')
//      elements: []
//          Literal | Tuple

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

export class File extends Node {
    path: string
    content: string
    encoding?: string
}

export class VariableDeclaration extends Node implements Declaration, Expression {
    id: Id
    assignable: boolean
    property: boolean
    type: TypeExpression
    value: Expression | null
    meta: Property[]
    getDependencies() {
        if (this.type) {
            if (this.value)
                return [this.type, this.value, ...this.meta]
            else
                return [this.type, ...this.meta]
        }
        else {
            if (this.value)
                return [this.value, ...this.meta]
            else
                return [...this.meta]
        }

        // lame that it takes that much code to express a conditional structure
        //  in ion 2 it should be closer to this:
        // return []
        //     if type
        //        type
        //     if value
        //         value
        //     ...meta
    }
    toString() {
        return `${this.property ? 'property' : this.assignable ? 'var' : 'let'} ${this.id.name}: ${this.type}`
    }
}
export class VariableBinding {
    value: Expression | null
    type: TypeExpression | null
    canonicalId: string | null
    assignable: boolean
    id: string  //  the canonical path to this variables value such as ion.Map or my.math.Vector or my.math.pi
    constructor(value:Expression|null,type:TypeExpression|null, assignable: boolean = false) {
        // this.id = id
        this.value = value
        this.assignable = assignable
    }
}
export abstract class Scope extends Node {
    //  from local variable name to a canonical type name
    //  the canonical types will be stored at the root level
    _variables: { [name: string]: VariableBinding } = {}
    addVariable(id: Id, value:Expression|null, type:TypeExpression|null = null, assignable: boolean = false) {
        let { name } = id
        if (this._variables[name] != null)
            id.throwSemanticError(`Cannot redeclare '${name}'`)
        this._variables[name] = new VariableBinding(value, type, assignable)
    }
}

export class Namespace extends Scope implements Expression {
    path: string[]
    get name() { return this.path ? this.path[this.path.length - 1] : null }
    // should have actual name property.

    namespaces: { [path: string]: Namespace }
    getDependencies(ancestors: object[]) {
        return []
    }
}

export class IrtRoot extends Node {
    options: { input: string, output: string }
    values: { [name: string]: Expression }
    _expressionDependencies: [Expression, Expression][] = Object.assign([], {
        toJSON() {
            // for debugging
            return this.map(([a, b]: [Expression, Expression]) => {
                return (a != null ? a.toDebugString() : "null") + " -> " + (b != null ? b.toDebugString() : "null")
            })
        }
    })
}

export class Assembly extends Namespace {
    options: { input: string, output: string }
    getExportValue(path: Id[]) {
        let pathString = path.map(id => id.name).join('.')
        let module = <Module>this.namespaces[pathString]
        if (module && !Array.isArray(module.exports)) {
            let declaration = <Declaration>module.exports
            return declaration.value
        }
        return null
    }
}

export class Module extends Namespace {
    id: Id
    imports: ImportDeclaration[]
    declarations: Declaration[]
    exports: Declaration | Declaration[]
    // calculated temporarily as part of identifier resolution
    unresolvedReferences: {[name: string]: Reference} = {}
    //  temporary expression dependencies map
    _expressionDependencies: [Expression, Expression][] = Object.assign([], {
        toJSON() {
            // for debugging
            return this.map(([a, b]: [Expression, Expression]) => {
                return (a != null ? a.toDebugString() : "null") + " -> " + (b != null ? b.toDebugString() : "null")
            })
        }
    })
}
export class ClassDeclaration extends Scope implements Declaration, TypeExpression {
    // type = new CanonicalReference("ion.Type")
    isStructure: boolean
    id: Id
    templateParameters: Parameter[]
    baseClasses: (Reference | CanonicalReference)[]
    declarations: Declaration[]
    meta: Property[]
    baseClassNames: string[]
    get value() {
        return this
    }
    get assignable() {
        return false
    }
    getDeclarationsRecursive(root:IrtRoot, results: Declaration[] = []) {
        for (let cref of this.baseClasses) {
            let classDeclaration = <ClassDeclaration>root.values[cref.name]
            if (classDeclaration == null) {
                console.log('cref not found?', cref)
            }
            classDeclaration.getDeclarationsRecursive(root, results)
        }
        // push inherited declarations first
        results.push(...this.declarations)
        return results
    }
    getBaseClassNamesRecursive(root: IrtRoot, results: string[] = []) {
        for (let cref of this.baseClasses) {
            let classDeclaration = <ClassDeclaration>root.values[cref.name]
            if (classDeclaration == null) {
                throw new Error('cref not found: ' + cref)
            }
            results.push(cref.name)
            classDeclaration.getBaseClassNamesRecursive(root, results)
        }
        return results
    }
    getDeclaration(name: string) {
        for (let declaration of this.declarations) {
            if (name === declaration.id.name) {
                return declaration
            }
        }
        return null
    }
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

export interface Pattern extends Node {
    getIds(): Id[]
}
type ExpressionFilter = (expr: Expression) => Expression
export interface Expression extends Node {
    type?: TypeExpression
    getDependencies(ancestors: object[]) : Expression[]
    simplify?: (ancestors: object[], filter: ExpressionFilter) => Expression | void
}
export function isExpression(node:any): node is Expression {
    return node != null && node.getDependencies != null
}
export type BooleanOperator = "<" | ">" | "<=" | ">=" | "==" | "!=" | "is" | "and" | "or" | "xor"
export type NumberOperator = "+" | "-" | "*" | "/" | "%" | "^"
export type BinaryOperator = BooleanOperator | NumberOperator
const operatorResultTypes = {
    "<": "ion.Boolean", "<=": "ion.Boolean", ">": "ion.Boolean", ">=": "ion.Boolean", "==": "ion.Boolean",
    "!=": "ion.Boolean", "is": "ion.Boolean", "and": "ion.Boolean", "or": "ion.Boolean", "xor": "ion.Boolean",
    "+": "ion.Number", "-": "ion.Number", "*": "ion.Number", "/": "ion.Number", "%": "ion.Number", "^": "ion.Number"
}
const jsOperatorMap: {[op:string]:string|null} = {
    is: null, // null means no direct mapping
    "==": "===",
    "!=": "!==",
    and: "&&",
    or: "||",
    xor: "^",
    not: "!"
}
function toJS(literal: Literal) {
    return JSON.stringify(literal.value)
}
export class BinaryExpression extends Node implements Expression {
    left: Expression
    operator: BinaryOperator
    right: Expression
    type?: CanonicalReference
    getDependencies(ancestors: object[]): Expression[] {
        return [this.left, this.right]
    }
    simplify(ancestors: object[], filter: ExpressionFilter) {
        let left = filter(this.left)
        let right = filter(this.right)
        if (left.className == Literal.name && right.className == Literal.name) {
            let jsOp = jsOperatorMap[this.operator]
            if (jsOp !== null) {
                if (jsOp == undefined)
                    jsOp = this.operator
                let value = eval(toJS(<Literal>left) + jsOp + toJS(<Literal>right))
                return new Literal({value}).simplify(ancestors, filter)
            }
        } else {
            this.type = new CanonicalReference(operatorResultTypes[this.operator])
        }
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
export class ConditionalExpression extends Node implements Expression {
    test: Expression
    consequent: Expression
    alternate: Expression
    getDependencies(ancestors: object[]): Expression[] {
        return [this.test, this.consequent, this.alternate]
    }
    simplify(ancestors: object[], filter: ExpressionFilter) {
        let test = filter(this.test)
        let consequent = filter(this.consequent)
        let alternate = filter(this.alternate)
        if (test instanceof Literal) {
            let testValue = eval(toJS(test))
            return testValue ? consequent : alternate
        }
    }
}
export interface Statement extends Node {}
export interface Declaration extends Node, Expression {
    id: Id
    value: Expression | null
    assignable: boolean
}
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
    get name() { return this.id.name }
    getDependencies(ancestors: object[]): Expression[] {
        let variable = this.getVariable(ancestors, this.id.name)
        if (variable == null) {
            this.throwSemanticError(`Variable is unresolved: ${this.id.name}`)
            return []
        }
        else if (variable.value) {
            return [variable.value]
        }
        else {
            return []
        }
    }
    simplify(ancestors: object[], filter: ExpressionFilter) {
        if (ancestors == null)
            throw new Error("ancestors is missing")
        let variable = this.getVariable(ancestors, this.id.name)
        // if (variable && variable.value && variable.assignable === false) {
        //     //  if the variable is assignable then value is just the initial or default value
        //     //  we should probably change the .value property to .defaultValue
        //     return filter(variable.value)
        // }
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

function last<T>(array: object[], predicate: (t:object) => boolean) {
    for (let i = array.length - 1; i >= 0; i--) {
        let element = array[i]
        if (predicate(element))
            return <T><any>element
    }
    throw new Error("not found")
}

export class ImportDeclaration extends Node {
    path: Id[]
    as: Id
    children: ImportDeclaration[] | true | null
    relative: number
    implicit: boolean
    get pathString() { return this.path.map(step => step.name).join('.') }
    getImportValue(ancestors: object[]) {
        let assembly = <Assembly>ancestors[0]
        return assembly.getExportValue(this.path)
    }
}

export class DotExpression extends Node implements Expression {
    type?: TypeExpression
    getAncestorConstrainedType(ancestors: object[]) {
        // a dot expression is dependent on it's containing baseType
        for (let i = ancestors.length - 1; i >= 0; i--) {
            let ancestor = ancestors[i]
            if (ancestor instanceof ConstrainedType)
                return ancestor
        }
        throw new Error("ConstrainedType ancestor not found")
    }
    getDependencies(ancestors: object[]): Expression[] {
        return [this.getAncestorConstrainedType(ancestors).baseType]
    }
    simplify(ancestors: object[], filter: ExpressionFilter) {
        // infer type as base type
        let constrainedType = this.getAncestorConstrainedType(ancestors)
        let baseType = filter(constrainedType.baseType)
        this.type = <TypeExpression>baseType
        // if (baseType instanceof CanonicalReference) {
        //     this.type = new CanonicalReference(baseType.id)
        // } else {
        //     throw new Error("BaseType is not a CanonicalReference: " + baseType)
        // }
        return this
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
    type?: CanonicalReference
    value: string | number | boolean | null
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    simplify(ancestors: object[], filter: ExpressionFilter) {
        // infer type
        this.type = new CanonicalReference(typeof this.value === 'number' ? 'ion.Number' : 'ion.String')
        return this
    }
    toString() {
        return JSON.stringify(this.value)
    }
}

// {[foo]: bar}

export class Property extends Node {
    key: Expression
    value: Expression | null
    computed: boolean
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
}

export class ObjectExpression extends Node implements Expression {
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
}

export class ArrayExpression extends Node implements Expression {
    elements: Expression[]
    getDependencies(ancestors: object[]): Expression[] {
        return this.elements
    }
}

export class ArrayPattern extends ArrayExpression {
}

//  Type Theory
//  for my purposes... a Type
//      can check if a value is an instance at runtime
//      can get a child property type at compile time

////////////////////////////////////////////////////////////////////////////////
//  Types
////////////////////////////////////////////////////////////////////////////////

export interface TypeExpression extends Expression {
    type?: CanonicalReference
}

export class CollectionType extends Node implements TypeExpression {
    keys: TypeExpression[] = []
    values: TypeExpression[] = []
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
}

export class CanonicalReference extends Node implements TypeExpression {
    id: string
    constructor(id: string) {
        super()
        this.id = id
    }
    get name() { return this.id }
    getReferencedExpression(ancestors: object[]) {
        let root = <IrtRoot>ancestors[0]
        return <Expression>root.values[this.id]
    }
    getDependencies(ancestors: object[]): Expression[] {
        let expression = this.getReferencedExpression(ancestors)
        return expression ? [expression] : []
    }
    simplify(ancestors: object[], filter: ExpressionFilter): Expression | void
    {
        //  only simplify Literal values and other CanonicalReferences
        let expression = filter(this.getReferencedExpression(ancestors))
        if (expression instanceof Literal) {
            return expression
        }
        if (expression instanceof CanonicalReference) {
            return new CanonicalReference(expression.id)
        }
    }
    toString() {
        return this.id
    }
    toJSON() {
        return this.id
    }
}
export class LiteralType extends Node implements TypeExpression {
    literal: Literal
    // type = new CanonicalReference("ion.Type")
    getDependencies(ancestors: object[]): Expression[] {
        return []
    }
    toString() {
        return `type ${this.literal}`
    }
}
export class TemplateReference extends Node implements TypeExpression {
    // type = new CanonicalReference("ion.Type")
    reference: Reference
    arguments: Expression[]
    get id() { return this.reference.id }
    get name() { return this.reference.name }
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
    // type = new CanonicalReference("ion.Type")
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
    // type = new CanonicalReference("ion.Type")
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
    // type = new CanonicalReference("ion.Type")
    left: TypeExpression
    right: TypeExpression
    getDependencies(ancestors: object[]) {
        return [this.left, this.right]
    }
    toString() {
        return this.left + '|' + this.right
    }
}
export class IntersectionType extends Node implements TypeExpression {
    // type = new CanonicalReference("ion.Type")
    left: TypeExpression
    right: TypeExpression
    getDependencies(ancestors: object[]) {
        return [this.left, this.right]
    }
    toString() {
        return this.left + '&' + this.right
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
    for (let scope of getScopes(self, ancestors))
        return scope
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

