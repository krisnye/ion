import { traverse, remove, skip, Visitor } from "../Traversal"
import * as escodegen from "escodegen"
import toposort from "../toposort"
import * as jst from "../JsAstTypes"
import * as c from "../common"
import * as ast from "../IonAst"

// to add runtime types to classes...
// [ ] add a unique symbol to every class
// [ ] define it and all inherited symbols in the prototype

const Node_NoOp = (node: any) => {
    return skip
}

function Freeze(value: any) {
    // // don't freeze anything
    // return value
    if (value.type == 'Literal')
        return value
    return {
        type: jst.CallExpression,
        callee: { type: jst.MemberExpression, object: Id('Object'), property: Id('freeze') },
        arguments: [value]
    }
}

const reservedWords = 'arguments,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield'.split(',')
const reservedWordSet = new Set(reservedWords)

function idNameToJavascript(name: string, convertToSafeName = false) {
    name = name.replace(/\./g, '_')
    if (convertToSafeName && reservedWordSet.has(name))
        name = `$${name}`
    return name
}

function SafeId(id: any) {
    return Id(id.name || id, null, true)
}

function Id(name: string, properties: any = null, convertToSafeName = false) {
    let node: any = {type:jst.Identifier, name:idNameToJavascript(name, convertToSafeName)}
    if (properties) {
        for (let name in properties) {
            node[name] = properties[name]
        }
    }
    return node
}
function Literal(value: any) {
    return {type:jst.Literal, value}
}

function getMetaValue(meta: ast.Property[], name: string) {
    for (let property of meta) {
        let key = property.key
        if (property.key && (<any>property.key).name == name) {
            return property.value
        }
    }
}

const __CanonicalReference_ToJavascriptIdentifier = (n:ast.CanonicalReference) => Id(n.id)
const __Literal_ToJavascriptLiteral = (n:ast.Literal) => Literal(n.value)
const __Id_ToJavascriptIdentifier = (n:ast.Id) => Id(n.name)
const __Reference_ToJavascriptIdentifier = (n: ast.Reference) => Id(n.id.name)
const __DotExpression_ToJavascriptIdentifier = (n:ast.DotExpression) => Id('$')
const operatorMap: {[op: string]: string} = {
    "^": "**",
    "==": "===",
    "!=": "!==",
    "and": "&&",
    "or": "||",
    "not": "!",
    "xor": "^" // this needs to be handle boolean values
}
const __CallExpression_ToJavascript = (n: ast.CallExpression) => {
    return { type: jst.CallExpression, callee:n.callee, arguments:n.arguments }
}
const __BinaryExpression_ToJavascript = (n:ast.BinaryExpression) => {
    if (!(n instanceof ast.BinaryExpression))
        return n

    let left: any = __BinaryExpression_ToJavascript(<ast.BinaryExpression>n.left)
    let right: any = __BinaryExpression_ToJavascript(<ast.BinaryExpression>n.right)

    let operator: any = n.operator
    operator = operatorMap[operator] || operator
    if (operator == '**' || operator == '^') {
        return {
            type: jst.CallExpression,
            callee: { type: jst.MemberExpression, object: Id('Math'), property: Id('pow') },
            arguments: [left, right]
        }
    }

    function toRuntimeTypeCheck() {
        return {
            type: jst.CallExpression,
            callee: { type: jst.MemberExpression, object: right, property: Id('is'), computed: false },
            // if Template then arguments are passed as extra arguments to is.
            arguments: [left, ...((<any>right).arguments || [])]
        }
    }
    // if operator = is then we need to do a type check
    if (operator == 'is') {
        return toRuntimeTypeCheck()
    }
    // if operator = is then we need to do a type check
    if (operator == 'isnt') {
        return {
            type: jst.UnaryExpression,
            operator: '!',
            argument: toRuntimeTypeCheck()
        }
    }
    return {type:jst.BinaryExpression, left, operator, right}
}
const __MemberExpression_ToJavascript = (n:ast.MemberExpression, ancestors: object[]) => {
    return {type:jst.MemberExpression, object: n.object, property: n.property, computed: false}
}

const __FunctionExpression_ToJavascript = (n: ast.FunctionExpression, ancestors: object[]) => {
    return { type: jst.FunctionExpression, params: n.parameters || [], body: n.body }
}

const __BlockStatement_ToJavascript = (n: ast.BlockStatement, ancestors: object[]) => {
    return { type: jst.BlockStatement, body: n.body }
}

const __ReturnStatement_ToJavascript = (n: ast.ReturnStatement, ancestors: object[]) => {
    return { type: jst.ReturnStatement, argument: n.argument }
}

const __IfStatement_ToJavascript = ({ test, consequent, alternate }: ast.IfStatement, ancestors: object[]) => {
    return { type: jst.IfStatement, test, consequent, alternate }
}

const __WhileStatement_ToJavascript = ({ test, body }: ast.WhileStatement, ancestors: object[]) => {
    return { type: jst.WhileStatement, test, body }
}

const __ArrayExpression_ToJavascript = ({ elements }: ast.ArrayExpression, ancestors: object[]) => {
    return { type: jst.ArrayExpression, elements }
}

const __AssignmentStatement_ToJavascript = ({ left, right }: ast.AssignmentStatement, ancestors: object[]) => {
    return { type: jst.ExpressionStatement, expression: { type: jst.AssignmentExpression, operator: "=", left, right } }
}

const __ForInStatement_ToJavascript = ({ left, right, body }: ast.ForInStatement, ancestors: object[]) => {
    //  For In => For Of
    return { type: jst.ForOfStatement, left:{ type: jst.VariableDeclaration, kind:"const", declarations: [{type:jst.VariableDeclarator, id:left}]}, right, body }
}

const __VariableDeclaration_ToJavascript = (d: ast.VariableDeclaration, ancestors: object[]) => {
    if (d instanceof ast.VariableDeclaration) {
        return { type: jst.VariableDeclaration, kind: d.assignable ? "let" : "const", declarations:[{ type: jst.VariableDeclarator, id: d.id, init: d.value }] }
    }
    else {
        return d
    }
}

const __MemberExpression_ToFunctionCallIfComputed = (n: ast.MemberExpression, ancestors: object[]) => {
    // this should probably be done BEFORE native output
    let propertyName = (<any>n).property.name
    let typeName = (<any>n).object.type.id
    let root: ast.IrtRoot = <ast.IrtRoot>ancestors[0]
    let classDeclaration = <ast.ClassDeclaration>root.values[typeName]
    let propertyDeclaration = classDeclaration.getDeclaration(propertyName)
    // check and see if the property exists
    if (propertyDeclaration == null)
        return n.property.throwSemanticError("Property '" + propertyName + "' not found on " + typeName)
    // if there is NO value defined, then we assume it's native computed
    let computed = propertyDeclaration.value == null
    if (computed) {
        // turn this into a function call
        return new ast.CallExpression({
            callee: new ast.MemberExpression({ object: new ast.CanonicalReference(typeName), property: new ast.Id({ name: propertyName }), computed: false }),
            arguments:[n.object]
        })
    }
    return n
}


function createPredicate(expression: any) {
    return {
        type: jst.ObjectExpression,
        properties: [
            {
                type: 'Property',
                key: Id('is'),
                kind: 'init',
                value: {
                    type: jst.ArrowFunctionExpression,
                    id: null,
                    params: [Id('$')],
                    expression: true,
                    body: expression
                }
            }
        ]
    }
}

const __LiteralType_ToRuntimePredicate = (node: ast.LiteralType) => {
    return createPredicate({
        type: jst.BinaryExpression,
        left: Id('$'),
        operator: '==',
        right: node.literal
    })
}

const __UnionType_ToRuntimePredicate = (node: ast.UnionType) => {
    return createPredicate({
        type: jst.BinaryExpression,
        left: __BinaryExpression_ToJavascript(new ast.BinaryExpression({
            left: Id('$'),
            operator: 'is',
            right: node.left
        })),
        operator: '||',
        right: __BinaryExpression_ToJavascript(new ast.BinaryExpression({
            left: Id('$'),
            operator: 'is',
            right: node.right
        }))
    })
}

const __ConstrainedType_ToRuntimePredicate = (node:ast.ConstrainedType) => {
    return createPredicate({
        type: jst.BinaryExpression,
        left: __BinaryExpression_ToJavascript(new ast.BinaryExpression({
            left: Id('$'),
            operator: 'is',
            right: node.baseType
        })),
        operator: '&&',
        right: node.constraint
    })

}

const __ClassDeclaration_ToJavascriptClass = (node:ast.ClassDeclaration, ancestors: object[], path: string[]) => {
    let fullName = path[path.length - 1]
    let meta = getMetaValue(node.meta, 'ion_Native_JavaScript')
    if (meta != null) {
        let value = (<ast.Literal>meta).value
        return { type: jst.Literal, value, verbatim: value }
    }

    let vars = node.declarations.filter(d => d.assignable)
    let lets = node.declarations.filter(d => !d.assignable)
    let classDeclaration = {
        type: jst.ClassExpression,
        id: node.id,
        superClass: null,
        body: {
            type: jst.ClassBody,
            body: [
                {
                    type: jst.MethodDefinition,
                    kind: 'constructor',
                    key: {
                        type: jst.Identifier,
                        name: "constructor"
                    },
                    value: node.isAbstract ? {
                        type: jst.FunctionExpression,
                        id: null,
                        params: [],
                        body: {
                            type: jst.BlockStatement,
                            body: [
                                {
                                    type: jst.ThrowStatement,
                                    argument: {
                                        type: jst.NewExpression,
                                        callee: Id("Error"),
                                        arguments: [ Literal(node.id.name + " is abstract")]
                                    }
                                }
                            ]
                        }
                    } : {
                        type: jst.FunctionExpression,
                        id: null,
                        params: [{
                            type: jst.RestElement,
                            argument: { type: jst.Identifier, name: "args" }
                        }],
                        body: {
                            type: jst.BlockStatement,
                            body: [{
                                type: jst.VariableDeclaration,
                                kind: 'let',
                                declarations: vars.map(d => {
                                    return {
                                        type: jst.VariableDeclarator,
                                        id: SafeId(d.id),
                                        init: d.value
                                    }
                                })
                            },
                            {
                                type: jst.ForOfStatement,
                                left: {
                                    type: jst.VariableDeclaration,
                                    declarations: [
                                        {
                                            type: jst.VariableDeclarator,
                                            id: Id('arg')
                                        }
                                    ],
                                    kind: "let"
                                },
                                right: Id('args'),
                                body: {
                                    type: jst.BlockStatement,
                                    body: [
                                        {
                                            "type": "IfStatement",
                                            "test": {
                                                "type": "BinaryExpression",
                                                "operator": "!=",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "arg"
                                                },
                                                "right": Literal(null),
                                            },
                                            "consequent": {
                                                "type": "BlockStatement",
                                                "body": vars.map(d => {
                                                    return {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "operator": "!==",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "computed": false,
                                                                "object": {
                                                                    "type": "Identifier",
                                                                    "name": "arg"
                                                                },
                                                                "property": d.id
                                                            },
                                                            "right": {
                                                                "type": "Identifier",
                                                                "name": "undefined"
                                                            }
                                                        },
                                                        "consequent": {
                                                            "type": "ExpressionStatement",
                                                            "expression": {
                                                                "type": "AssignmentExpression",
                                                                "operator": "=",
                                                                "left": SafeId(d.id),
                                                                "right": {
                                                                    "type": "MemberExpression",
                                                                    "computed": false,
                                                                    "object": {
                                                                        "type": "Identifier",
                                                                        "name": "arg"
                                                                    },
                                                                    "property": d.id
                                                                }
                                                            }
                                                        },
                                                        "alternate": null
                                                    }
                                                })
                                            },
                                            "alternate": null
                                        }
                                    ]
                                }
                            }].concat(<any>vars.map(d => {
                                return {
                                    type: jst.IfStatement,
                                    test: __BinaryExpression_ToJavascript(new ast.BinaryExpression({
                                        left: SafeId(d.id), operator: 'isnt', right: d.type
                                    })),
                                    consequent: {
                                        type: jst.ThrowStatement,
                                        argument: {
                                            type: jst.NewExpression,
                                            callee: {
                                                type: "Identifier",
                                                name: "Error"
                                            },
                                            arguments: [
                                                {
                                                    type: jst.BinaryExpression,
                                                    left: {
                                                        type: jst.Literal,
                                                        value: `${SafeId(d.id).name} is not valid: `
                                                    },
                                                    operator: '+',
                                                    right: {
                                                        type: jst.CallExpression,
                                                        callee: {
                                                            type: jst.MemberExpression,
                                                            object: Id('JSON'),
                                                            property: Id('stringify')
                                                        },
                                                        arguments: [SafeId(d.id)]
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    alternate: null
                                }
                            })).concat(<any>vars.map(d => {
                                return {
                                    type: jst.ExpressionStatement,
                                    expression: {
                                        type: jst.AssignmentExpression,
                                        operator: "=",
                                        left: {
                                            type: jst.MemberExpression,
                                            object: { type: jst.ThisExpression },
                                            property: d.id
                                        },
                                        right: SafeId(d.id)
                                    }
                                }
                            })).concat(<any>lets.map(d => {
                                return {
                                    type: jst.ExpressionStatement,
                                    expression: {
                                        type: jst.AssignmentExpression,
                                        operator: "=",
                                        left: {
                                            type: jst.MemberExpression,
                                            object: { type: jst.ThisExpression },
                                            property: SafeId(d.id)
                                        },
                                        right: d.value
                                    }
                                }
                            }).concat(<any>[
                                {
                                    type: jst.ExpressionStatement,
                                    expression: Freeze({ type: jst.ThisExpression })
                                }
                            ]))
                        }
                    }
                }
            ]
        }
    }
    let isFunctionVerbatim = `$ => $ != null && $.constructor.types != null && $.constructor.types.has('${fullName}')`
    // wrap the class in an Object.assign
    return {
        type: jst.CallExpression,
        callee: { type: jst.MemberExpression, object: Id('Object'), property: Id('assign') },
        arguments: [
            classDeclaration,
            {
                type: jst.ObjectExpression,
                properties: [{
                    type: jst.Property,
                    key: Id('types'),
                    kind: 'init',
                    value: {
                        type: jst.NewExpression,
                        callee: Id('Set'),
                        arguments: [{
                            type: jst.ArrayExpression,
                            elements: node.baseClassNames.map((name) => {
                                return { type: jst.Literal, value: name }
                            }).concat([{ type: jst.Literal, value: fullName}])
                        }]
                    }
                }, {
                    type: jst.Property,
                    key: Id('is'),
                    kind: 'init',
                    value: {
                        type: jst.Literal,
                        value: isFunctionVerbatim,
                        verbatim: isFunctionVerbatim
                    }
                }, {
                    type: jst.Property,
                    key: Id('path'),
                    kind: 'init',
                    value: {
                        type: jst.Literal,
                        value: fullName
                    }
                }]
            }
        ]
    }        
}

const __IrtRoot_ToJavascriptModule = (node:ast.IrtRoot) => {
    // let's create the export object first
    let exportNames = Object.keys(node.values).filter(name => name.indexOf('$') < 0)
    function getExportValue(prefix: string = ""): any {
        let value = node.values[prefix]
        if (value != null)
            return Id(prefix)
        return Freeze({ type: jst.ObjectExpression, properties: getExportProperties(prefix) })
    }
    function getExportProperties(prefix: string = ""): any {
        if (prefix.length > 0)
            prefix = prefix + '.'
        let names = exportNames.filter(name => name.startsWith(prefix)).map(name => name.substring(prefix.length).split(/\./)[0])
        let uniqueNames = Array.from(new Set(names))
        return uniqueNames.map(name => {
            // console.log('unique: ', {prefix,name,exists:node.values[prefix+name] != null})
            return { type: jst.Property, key:Id(name), value:getExportValue(prefix + name)}
        })
    }
    let exportObject = getExportValue()
    // console.log(JSON.stringify(exportObject, null, 2))
    return {
        type: jst.Program,
        options: node.options,
        sourceType: "module",
        body: [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": "use strict"
                },
                "directive": "use strict"
            }
        ].concat((<any>Object.keys(node.values)).map(
            (name: any) => {
                let value = node.values[name]
                return {
                    type: jst.VariableDeclaration,
                    kind: 'const',
                    declarations: [{
                        type: jst.VariableDeclarator,
                        id: Id(name),
                        init: Freeze(value)
                    }]
                }
            }
        ).concat([
            { type: jst.ExportDefaultDeclaration, declaration: exportObject}
        ]))
    }
}

const __Program_CompileJavascript = (node:any) => {
    let options: {input:string, output:string} = node.options
    return new ast.File({
        path: options.output + "/assembly.js",
        content: escodegen.generate(node, {verbatim:'verbatim'})
    })
}

const __TemplateReference_ToJavascript = (node:ast.TemplateReference) => {
    return node.reference
}

const classNamesFound: any = {}
const Node_findClassNamesThatNeedConversion = (n: any) => {
    if (n.className) {
        if (classNamesFound[n.className] == null) {
            classNamesFound[n.className] = true
            console.warn(n.className + " <----------- convert to Javascript")
        }
    }
}

const __CallExpression_SimplifyTypeIsCalls = (n: any) => {
    // before
    // $ => ({ is: $ => $ === 0 }.is($) || { is: $ => $ === 1 }.is($))
    // after
    // $ => $ === 0 || $ === 1
    if (
        n.callee.type == jst.MemberExpression &&
        n.callee.object.type == jst.ObjectExpression &&
        n.callee.object.properties.length == 1 &&
        n.callee.object.properties[0].value.type == jst.ArrowFunctionExpression &&
        n.callee.object.properties[0].value.params[0].name == n.arguments[0].name
    ) {
        return n.callee.object.properties[0].value.body
    }
}

export const passes = [
    [__MemberExpression_ToFunctionCallIfComputed],
    [__CanonicalReference_ToJavascriptIdentifier, __Literal_ToJavascriptLiteral, __Id_ToJavascriptIdentifier, __Reference_ToJavascriptIdentifier],
    [__ConstrainedType_ToRuntimePredicate, __LiteralType_ToRuntimePredicate, __UnionType_ToRuntimePredicate],
    [__CallExpression_ToJavascript, __MemberExpression_ToJavascript],
    [__BinaryExpression_ToJavascript],
    [__DotExpression_ToJavascriptIdentifier],
    [__CallExpression_SimplifyTypeIsCalls],
    [__ClassDeclaration_ToJavascriptClass],
    [__TemplateReference_ToJavascript, __BlockStatement_ToJavascript, __FunctionExpression_ToJavascript, __ReturnStatement_ToJavascript, __IfStatement_ToJavascript, __VariableDeclaration_ToJavascript, __WhileStatement_ToJavascript, __AssignmentStatement_ToJavascript, __ForInStatement_ToJavascript, __ArrayExpression_ToJavascript],
    [Node_NoOp, __IrtRoot_ToJavascriptModule],
    [Node_findClassNamesThatNeedConversion],
    [Node_NoOp, __Program_CompileJavascript]
]
