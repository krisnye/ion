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

const __ConstrainedType_ToRuntimePredicate = (node:ast.ConstrainedType) => {
    return {
        type: jst.ObjectExpression,
        properties: [
            {
                type: 'Property',
                key: Id('is'),
                kind: 'init',
                value: {
                    type: jst.FunctionExpression,
                    id: null,
                    params: [Id('$')],
                    body: {
                        type: jst.BlockStatement,
                        body: [
                            {
                                type: jst.ReturnStatement,
                                argument: Literal(true)
                            }
                        ]
                    }
                }
            }
        ]
    }
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
        body: node.sorted.map(
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
        if (classNamesFound[n.className]) {
            classNamesFound[n.className] = true
            console.warn(n.className + " <----------- convert to Javascript")
        }
    }
}

export const passes = [
    [__CanonicalReference_ToJavascriptIdentifier, __Literal_ToJavascriptLiteral,__Id_ToJavascriptIdentifier],
    [__ConstrainedType_ToRuntimePredicate],
    [__ClassDeclaration_ToJavascriptClass],
    [Node_NoOp, __IrtRoot_ToJavascriptModule],
    [Node_findClassNamesThatNeedConversion],
    [Node_NoOp, __Program_CompileJavascript]
]
