import { traverse, remove, skip, Visitor } from "../Traversal"
import * as escodegen from "escodegen"
import toposort from "../toposort"
import * as jst from "../JsAstTypes"
import * as c from "../common"
import * as ast from "../IonAst"

const Node_NoOp = (node: any) => {
    return skip
}

function Freeze(value: any) {
    if (value.type == 'Literal')
        return value
    return {
        type: jst.CallExpression,
        callee: { type: jst.MemberExpression, object: Id('Object'), property: Id('freeze') },
        arguments: [value]
    }
}

//  creates a javascript Id, also replaces invalid id values.
function Id(name: string, properties?: any) {
    let node: any = {type:jst.Identifier, name:name.replace(/\./g, '_')}
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
        left: {
            type: jst.BinaryExpression,
            left: Id('$'),
            operator: 'is',
            right: node.left
        },
        operator: 'or',
        right: {
            type: jst.BinaryExpression,
            left: Id('$'),
            operator: 'is',
            right: node.right
        }
    })
}

const __ConstrainedType_ToRuntimePredicate = (node:ast.ConstrainedType) => {
    return createPredicate({
        type: jst.BinaryExpression,
        left: {
            type: jst.BinaryExpression,
            left: Id('$'),
            operator: 'is',
            right: node.baseType
        },
        operator: 'and',
        right: node.constraint
    })

}

const __ClassDeclaration_ToJavascriptClass = (node:ast.ClassDeclaration, ancestors: object[]) => {
    let meta = getMetaValue(node.meta, 'ion_Native_JavaScript')
    if (meta != null) {
        let value = (<ast.Literal>meta).value
        return { type: jst.Literal, value, verbatim: value }
    }

    let vars = node.declarations.filter(d => d.assignable)
    let lets = node.declarations.filter(d => !d.assignable)
    return {
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
                    value: {
                        type: jst.FunctionExpression,
                        id: null,
                        params: vars.map(d => {
                            return d.value ? {
                                type: jst.AssignmentPattern,
                                left: d.id, right: d.value
                            } : d.id
                        }),
                        body: {
                            type: jst.BlockStatement,
                            body: vars.map(d => {
                                return {
                                    type: jst.IfStatement,
                                    test: __BinaryExpression_ToJavascript(new ast.BinaryExpression({
                                        left: d.id, operator: 'isnt', right: d.type
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
                                                        value: `${d.id.name} is not valid: `
                                                    },
                                                    operator: '+',
                                                    right: d.id
                                                }
                                            ]
                                        }
                                    },
                                    alternate: null
                                }
                            }).concat(<any>vars.map(d => {
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
                                        right: d.id
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
                                            property: d.id
                                        },
                                        right: d.value
                                    }
                                }
                            }).concat(<any>[
                                {
                                    type: jst.ExpressionStatement,
                                    expression: Freeze({type:jst.ThisExpression})
                                }
                            ]))
                        }
                    }
                }
            ]
        }
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
        body: (<any>Object.keys(node.values)).map(
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
        ])
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
    [__TemplateReference_ToJavascript],
    [Node_NoOp, __IrtRoot_ToJavascriptModule],
    [Node_findClassNamesThatNeedConversion],
    [Node_NoOp, __Program_CompileJavascript]
]
