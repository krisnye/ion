import * as escodegen from "escodegen"
import * as jst from "../JsAstTypes"
import {fail} from "./Input"

////////////////////////////////////////////////////////////////////////////////////
//  Export to Javascript Filters
////////////////////////////////////////////////////////////////////////////////////
const __VariableDeclaration_ToJavascript = (node:any) => {
    return {
        type: jst.VariableDeclaration,
        kind: node.kind === 'let' ? 'const' : 'var',
        declarations: node.declarations
    }
}
const __IdDeclaration_IdReference_Id_ToIdentifier = (node:any) => {
    node.type = jst.Identifier
}

const Assembly_ModulesToJavascriptFiles = (node: any) => {
    //  make a file for each root module
    node.files = Object.keys(node.modules).map(
        (name: any) => {
            return {
                type: "File",
                language: "javascript",
                path: node.options.output + '/' + name + '.js',
                content: {
                    type: jst.Program,
                    body: [
                        {
                            type: jst.ExpressionStatement,
                            expression: {
                                type: jst.CallExpression,
                                arguments: [],
                                callee: {
                                    type: jst.FunctionExpression,
                                    params: [],
                                    body: {
                                        type: jst.BlockStatement,
                                        body: [
                                            {
                                                type: jst.VariableDeclaration,
                                                kind: 'const',
                                                declarations: [
                                                    {
                                                        type: jst.VariableDeclarator,
                                                        id: {type:jst.Identifier, name},
                                                        init: {
                                                            type: jst.AssignmentExpression,
                                                            left: {
                                                                type: jst.MemberExpression,
                                                                object: {type:jst.ThisExpression},
                                                                property: {type:jst.Identifier, name}
                                                            },
                                                            operator: '=',
                                                            right: node.modules[name]
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    )
    //  delete modules from assembly
    delete node.modules
}
    
const __Module_ToJavascript = (node: any, ancestors: object[], path: string[]) => {
    let name = path[path.length - 1]
    return {
        type: jst.CallExpression,
        callee: {
            type: jst.FunctionExpression,
            params: [],
            body: {
                type: jst.BlockStatement,
                body: (function(){
                    debugger
                    //  imports? not yet
                    let statements: any[] = [...node.declarations]
                    if (Array.isArray(node.exports)) {
                        for (let exportDeclaration of node.exports) {
                            statements.push(exportDeclaration)
                        }
                        statements.push({
                            type: jst.ReturnStatement,
                            argument: {
                                type: jst.ObjectExpression,
                                properties: node.exports.map(
                                    (declaration:any) => {
                                        return declaration.declarations.map(
                                            (declarator:any) => {
                                                return {
                                                    type: jst.Property,
                                                    kind: "init",
                                                    shorthand: true,
                                                    key: declarator.id,
                                                    value: declarator.id
                                                }
                                            }
                                        )
                                    }
                                ).reduce(
                                    ((a:any, b:any) => a.concat(b)), []
                                )
                            }
                        })
                    } else {
                        let exportDeclaration = node.exports
                        statements.push(exportDeclaration)
                        statements.push({
                            type: jst.ReturnStatement,
                            argument: exportDeclaration.id
                        })
                    }
                    if (statements[0].length == 0)
                        debugger
                    return statements
                }())
            }
        },
        arguments: []
    }
}

const __ClassDeclaration_ToJavascript = (node:any) => {
    return {
        type: 'FunctionDeclaration',
        id: node.id,
        params: node.variables.map(
            (declaration:any) => {
                if (declaration.kind === 'let')
                    return []
                return declaration.declarations.map(
                    (declarator:any) => {
                        if (declarator.init != null) {
                            return {
                                type: 'AssignmentPattern',
                                left: declarator.id,
                                right: declarator.init
                            }
                        }
                        else {
                            return declarator.id
                        }
                    }
                )
            }
        ).reduce(
            ((a:any, b:any) => a.concat(b)), []
        ),
        body: {
            type: jst.BlockStatement,
            body: node.variables.map(
                (declaration:any) => {
                    if (declaration.kind !== 'let') {
                        return declaration.declarations.map(
                            (declarator:any) => {
                                return {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'MemberExpression',
                                            object: {type:'ThisExpression'},
                                            property: declarator.id
                                        },
                                        operator: '=',
                                        right: declarator.id
                                    }
                                }
                            }
                        )
                    }

                    return {
                        type: declaration.type,
                        kind: declaration.kind,
                        declarations: declaration.declarations.map(
                            (declarator:any) => {
                                declarator.init = {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'MemberExpression',
                                        object: {type:'ThisExpression'},
                                        property: declarator.id
                                    },
                                    operator: '=',
                                    right: declarator.init
                                }

                                return declarator
                            }
                        )
                    }
                }
            ).reduce(
                ((a:any, b:any) => a.concat(b)), []
            ),
        }
    }
}

const _ForInStatement_ToJavascript = (node:any) => {
    // ion for "in" is a javascript for "of"
    node.type = "ForOfStatement"
}

const File_CompileJavascript = (node:any) => {
    if (node.language == "javascript") {
        node.content = escodegen.generate(node.content)
    }
}

const __AssignmentStatement_ToJavascript = (node:any) => {
    return {
        type: 'ExpressionStatement',
        location: node.location,
        expression: {
            type: 'AssignmentExpression',
            left: node.left,
            operator: '=',
            right: node.right
        }
    }
}

const operatorMap: {[name: string]:string} = {
    and: "&&",
    or: "||",
    not: "!",
    xor: "^"
}
const BinaryExpression_UnaryExpression_ToJavascript = (node:any) => {
    node.operator = operatorMap[node.operator] || node.operator
}

//  if a call starts with uppercase then it's automatically assumed to be a Type
//  and so the call is converted to a NewExpression
const __CallExpression_ToNewExpression = (node:any) => {
    let name = node.callee.name
    if (name != null && name[0] === name[0].toUpperCase()) {
        node.type = 'NewExpression'
    }
    return node
}

export const passes = [
    [__CallExpression_ToNewExpression]
    ,[_ForInStatement_ToJavascript]
    ,[__AssignmentStatement_ToJavascript]
    ,[BinaryExpression_UnaryExpression_ToJavascript]
    ,[__ClassDeclaration_ToJavascript]
    ,[__Module_ToJavascript]
    ,[__VariableDeclaration_ToJavascript, __IdDeclaration_IdReference_Id_ToIdentifier]
    ,[Assembly_ModulesToJavascriptFiles]
    ,[File_CompileJavascript]
]
