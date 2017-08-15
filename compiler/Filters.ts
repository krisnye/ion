import {traverse,remove,Visitor} from "./Traversal"
import toposort from "./toposort"
import * as escodegen from "escodegen"
import * as jst from "./JsAstTypes"
import * as iot from "./IonAstTypes"
import * as common from "./common"

function fail(node:any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
    throw error
}
function clear(node:any) {
    for (let path in node) {
        delete node[path]
    }
}

const Module_NoVars = (node:any) => {
    function failIfVar(declaration:any) {
        if (Array.isArray(declaration)) {
            for (let d of declaration) {
                failIfVar(d)
            }
        }
        else if (declaration.type === iot.VariableDeclaration && declaration.kind === 'var') {
            fail(declaration, "Cannot export mutable variables")
        }
    }
    failIfVar(node.declarations)
    failIfVar(node.exports)
}
// const BinaryExpression_ToCall = {
//     name: 'BinaryExpression_ToCall',
//     target: ['BinaryExpression'],
//     mutate: true,
//     leave: (node:any) => {
//         let {location, left, right, operator} = node
//         return {
//             type:'Call',
//             location,
//             callee: {type:'IdReference', name:operator},
//             arguments: [left, right]
//         }
//     }
// }
const Assembly_NamesInitAndModuleNameInit = (node:any) => {
    let names: any = {}
    for (let modulePath in node.modules) {
        let module = node.modules[modulePath]
        let name: any = modulePath.split('.').pop()
        module.name = name
        if (names[name])
            fail(node.modules[modulePath], "CompilerError: " + modulePath + " short name cannot be the same as " + names[name])
        names[name] = modulePath
    }
    node._names = names
}
const IdDeclaration_CheckNoHideModuleNames = (node:any, ancestors:any[]) => {
    let {name} = node
    let root = ancestors[0]
    if (root._names[name])
        fail(node, "Cannot declare identifier with same name as local module: " + name)
}
const Module_DependenciesCreate = (node:any, ancestors:any[]) => {
    node._dependencies = {}
}
const IdReference_ModuleDependenciesInit = (node:any, ancestors:any[]) => {
    let {name} = node
    let [assembly, , module] = ancestors
    let modulePath = assembly._names[name]
    if (modulePath) {
        module._dependencies[modulePath] = {__location:node.__location}
    }
}
const Assembly_ModuleOrderInit = (node:any) => {
    let edges: [any,any,any][] = [] // third item is location of dependency IdReference
    let tail = {}
    // get all the module dependencies as edges
    for (let modulePath in node.modules) {
        let module = node.modules[modulePath]
        let dependencies = module._dependencies
        edges.push([modulePath, tail, null])
        for (let dep in dependencies) {
            edges.push([dep, modulePath, dependencies[dep]])
        }
    }
    let lastRemovedEdge = null
    while (true) {
        let order
        try {
            order = toposort(edges).slice(0, -1) // slice to remove tail
        }
        catch (e) {
            lastRemovedEdge = edges.pop()
            continue
        }
        if (lastRemovedEdge != null) {
            //  this means we have failed with a cyclic dependency
            //  the last removed one must be the problem since it works now
            let location = lastRemovedEdge[2].__location
            fail(location, "Cyclic module dependencies are not supported")
        }
        node._moduleOrder = order
        return
    }

}

const Assembly_NestModules = (node:any) => {
    let rootModules: any = {modules:{}}
    function getModule(steps:string[]): any {
        let parentModule = steps.length > 1 ? getModule(steps.slice(0, -1)) : rootModules
        let name = steps[steps.length - 1]
        let module = parentModule.modules[name]
        if (module == null)
            module = parentModule.modules[name] = {type:'Module',imports:[],declarations:[],exports:[],modules:{}}
        return module
    }

    for (let path in node.modules) {
        let module = node.modules[path]
        let steps = path.split('.')
        let parentModule = getModule(steps.slice(0, -1))
        getModule(steps.slice(0, -1)).modules[steps[steps.length-1]] = module
    }
    //  now replace root modules with this new modules
    node.modules = rootModules.modules
}

const Module_ModulesToExports = (node: any) => {
    for (let name in node.modules) {
        let module = node.modules[name]
        node.exports.push(
            {
                type: iot.VariableDeclaration,
                kind: 'let',
                id: {type:'Id', name},
                value: module
            }
        )
    }
    //  now remove modules
    delete node.modules
}

////////////////////////////////////////////////////////////////////////////////////
//  Export to Javascript Filters
////////////////////////////////////////////////////////////////////////////////////
const __VariableDeclaration_ToJavascript = (node:any) => {
    return {
        type: jst.VariableDeclaration,
        kind: node.kind === 'let' ? 'const' : 'var',
        declarations: [
            {
                type: jst.VariableDeclarator,
                id: node.id,
                init: node.value
            }
        ]
    }
}
const IdDeclaration_IdReference_Id_ToJavascript = (node:any) => {
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
            id: {type:jst.Identifier,name},
            params: [],
            body: {
                type: jst.BlockStatement,
                body: (function(){
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
                                        return {
                                            type: jst.Property,
                                            kind: "init",
                                            key: declaration.id,
                                            value: declaration.id
                                        }
                                    }
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
                    return statements
                }())
            }
        },
        arguments: [],
    }
}

const File_CompileJavascript = (node:any) => {
    if (node.language == "javascript") {
        node.content = escodegen.generate(node.content)
    }
}

const File_Write = (node:any) => {
    console.log('Writing ' + node.path)
    common.write(node.path, node.content, node.encoding)
}

export const defaultPasses = [
    [Module_NoVars, Assembly_NamesInitAndModuleNameInit, IdDeclaration_CheckNoHideModuleNames],
    [Module_DependenciesCreate, IdReference_ModuleDependenciesInit],
    [Assembly_ModuleOrderInit],
    [Assembly_NestModules, Module_ModulesToExports],
    [__Module_ToJavascript],
    [__VariableDeclaration_ToJavascript, IdDeclaration_IdReference_Id_ToJavascript],
    [Assembly_ModulesToJavascriptFiles],
    [File_CompileJavascript,File_Write]
]
