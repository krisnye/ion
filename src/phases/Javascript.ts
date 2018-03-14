import { traverse, remove, skip, Visitor } from "../Traversal"
import * as escodegen from "escodegen"
import toposort from "../toposort"
import * as jst from "../JsAstTypes"
import * as c from "../common"
import * as ast from "../IonAst"

const Node_NoOp = (node: any) => {
    return skip
}

function Id(name: string) {
    return {type:jst.Identifier, name:name.replace(/\./g, '_')}
}
function Literal(value: any) {
    return {type:jst.Literal, value}
}

const __CanonicalReference_ToJavascriptIdentifier = (n:ast.CanonicalReference) => Id(n.id)
const __Literal_ToJavascriptLiteral = (n:ast.Literal) => Literal(n.value)
const __Id_ToJavascriptIdentifier = (n:ast.Id) => Id(n.name)
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
const __BinaryExpression_ToJavascript = (n:ast.BinaryExpression) => {
    let operator = n.operator
    operator = operatorMap[operator] || operator
    // if operator = is then we need to do a type check
    if (operator == 'is') {
        return {
            type: jst.CallExpression,
            callee: { type:jst.MemberExpression, object: n.right, property: Id('is'), computed: false },
            arguments: [n.left]
        }
    }
    return {type:jst.BinaryExpression, left:n.left, operator, right:n.right}
}
const __MemberExpression_ToJavascript = (n:ast.MemberExpression) => {
    return {type:jst.MemberExpression, object: n.object, property: n.property, computed: false}
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

const __ClassDeclaration_ToJavascriptClass = (node:ast.ClassDeclaration) => {
    return {
        type: jst.ClassExpression,
        id: node.id,
        superClass: null,
        body: {
            type: jst.ClassBody,
            body: []
        }
    }
}

const __IrtRoot_ToJavascriptModule = (node:ast.IrtRoot) => {
    return {
        type: jst.Program,
        sourceType: "module",
        body: Object.keys(node.values).map(
            (name) => {
                let value = node.values[name]
                return {
                    type: jst.VariableDeclaration,
                    kind: 'const',
                    declarations: [{
                        type: jst.VariableDeclarator,
                        id: Id(name),
                        init: value
                    }]
                }
            }
        )
    }
}

const __Program_CompileJavascript = (node:any) => {
    return {
        source: escodegen.generate(node)
    } 
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
    if (
        n.callee.type == jst.MemberExpression &&
        n.callee.object.type == jst.ObjectExpression &&
        n.callee.object.properties.length == 1 &&
        n.callee.object.properties[0].value.type == jst.ArrowFunctionExpression &&
        n.callee.object.properties[0].value.params[0].name == n.arguments[0].name
    ) {
        return n.callee.object.properties[0].value.body
    }

    // before
    // $ => ({ is: $ => $ === 0 }.is($) || { is: $ => $ === 1 }.is($))
    // after
    // $ => $ === 0 || $ === 1
}

export const passes = [
    [__CanonicalReference_ToJavascriptIdentifier, __Literal_ToJavascriptLiteral,__Id_ToJavascriptIdentifier],
    [__ConstrainedType_ToRuntimePredicate, __LiteralType_ToRuntimePredicate, __UnionType_ToRuntimePredicate],
    [__DotExpression_ToJavascriptIdentifier, __BinaryExpression_ToJavascript, __MemberExpression_ToJavascript],
    [__CallExpression_SimplifyTypeIsCalls],
    [__ClassDeclaration_ToJavascriptClass],
    [Node_NoOp, __IrtRoot_ToJavascriptModule],
    [Node_findClassNamesThatNeedConversion],
    [Node_NoOp, __Program_CompileJavascript]
]
