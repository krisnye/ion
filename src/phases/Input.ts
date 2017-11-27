import {traverse,remove,Visitor} from "../Traversal"
// import toposort from "../toposort"
// import * as escodegen from "escodegen"
import * as common from "../common"
import * as ast from "../IonAst"

function* getScopes(self: ast.Node | null, ancestors: object[]) {
    if (self instanceof ast.Scope)
        yield self
    for (let i = ancestors.length - 1; i >= 0; i--) {
        let node = ancestors[i]
        if (node instanceof ast.Scope)
            yield node
    }
}

const getScope = (self:ast.Node | null, ancestors: object[]) => {
    for (let scope of getScopes(self, ancestors)) {
        return scope
    }
    throw new Error("Scope not found")
}

const getVariableBinding = (self:ast.Node, ancestors: object[], name: string) => {
    for (let scope of getScopes(self, ancestors)) {
        let variable = scope.variables[name]
        if (variable != null)
            return variable
    }
    return null
}

const getFirstOfType = (type: any, array: object[]) => {
    for (let element of array) {
        if (element instanceof type)
            return element
    }
    return null
}

const getModule: (ancestors:object[]) => ast.Module = getFirstOfType.bind(null, ast.Module)

export function fail(node:any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
    throw error
}

const addVariableBinding = (scope:ast.Scope, binding:ast.VariableBinding) => {
    let { name } = binding.id
    if (scope.variables[name] != null)
        fail(binding.id, `Cannot redeclare '${name}'`)
    scope.variables[name] = binding
}

const VariableDeclaration_AddVariableBindings = (node: ast.VariableDeclaration, ancestors: object[]) => {
    let scope = getScope(node, ancestors)
    addVariableBinding(scope, new ast.VariableBinding({ id: node.id, assignable: node.assignable }))
}
const Parameter_AddVariableBindings = (node: ast.Parameter, ancestors: object[]) => {
    let scope = getScope(node, ancestors)
    if (!(node.pattern instanceof ast.Id)) {
        fail(node, "Patterns not supported yet")
    }
    addVariableBinding(scope, new ast.VariableBinding({ id: <ast.Id>node.pattern }))
}
const ForInStatement_AddVariableBindings = (node: ast.ForInStatement, ancestors: object[]) => {
    let scope = getScope(node, ancestors)
    if (!(node.left instanceof ast.Id)) {
        fail(node, "Patterns not supported yet")
    }
    addVariableBinding(scope, new ast.VariableBinding({ id: <ast.Id>node.left }))
}
const TypeDeclaration_AddVariableBindings = (node: ast.TypeDeclaration, ancestors: object[]) => {
    let scope = getScope(node, ancestors)
    addVariableBinding(scope, new ast.VariableBinding({ id: node.id, typeVariable: true }))
}
const ClassDeclaration_AddVariableBindings = (node: ast.ClassDeclaration, ancestors: object[]) => {
    // place class name into parent scope as type variable
    let scope = getScope(null, ancestors)
    addVariableBinding(scope, new ast.VariableBinding({ id: node.id, typeVariable: true }))
}
const ImportDeclaration_AddVariableBindings = (node: ast.ImportDeclaration, ancestors: object[]) => {
    if (node.as != null) {
        let scope = getScope(null, ancestors)
        addVariableBinding(scope, new ast.VariableBinding({ id: node.as, typeVariable: null }))
    }
}

const IdReference_TypeReference_CheckIfUnresolvedAndAddToModule = (node: ast.Reference, ancestors: object[]) => {
    let name = node.id.name
    let variable = getVariableBinding(node, ancestors, name)
    if (variable == null) {
        let module = getModule(ancestors)
        if (module.unresolvedReferences[name] == null) {
            module.unresolvedReferences[name] = node
        }
    }
}

const Module_resolveReferences = (node: ast.Module, ancestors: object[]) => {
    for (let name in node.unresolvedReferences) {
        let reference = node.unresolvedReferences[name]
        let foundModules: ast.Module[] = []
        for (let rootImport of node.imports) {
            let assembly = <ast.Assembly>ancestors[0]
            if (rootImport.children === true) {
                // get pathString() { return this.path.map(step => step.name).join('.') }
                let checkPath = rootImport.pathString + "." + name
                let referencedModule = assembly.modules[checkPath]
                if (referencedModule != null) {
                    foundModules.push(referencedModule)
                }
            }
        }
        if (foundModules.length == 0) {
            fail(reference, `'${name}' could not be resolved`)
        } else if (foundModules.length > 1) {
            fail(reference, `'${name}' resolves ambiguously to ${foundModules.map(x => x.name).join(', ')}`)
        } else {
            let foundModule = foundModules[0]
            //  add new specific import declaration
            let newImport = new ast.ImportDeclaration({ path:foundModule.path, children: null, as: reference.id, relative: 0 })
            node.imports.push(newImport)
            //  declare new binding
            ImportDeclaration_AddVariableBindings(newImport, ancestors.concat([node]))
            //  remove reference from unresolved
            delete node.unresolvedReferences[name]
        }
    }
    //  finally, remove all wildcard imports
    for (let i = node.imports.length - 1; i >= 0; i--) {
        let rootImport = node.imports[i]
        if (rootImport.children === true) {
            node.imports.splice(i, 1)
        }
    }
}

const AssignmentStatement_CheckAssignable = (node: ast.AssignmentStatement, ancestors: object[]) => {
    if (node.left instanceof ast.Id) {
        let variable = getVariableBinding(node, ancestors, node.left.name)
        if (variable != null && !variable.assignable)
            fail(node.left, `'${node.left.name}' is not assignable`)
    }
}
const Assembly_ModulePathInit = (node:ast.Assembly) => {
    for (let modulePath in node.modules) {
        let module = node.modules[modulePath]
        module.path = modulePath.split('.')
    }
}

const Module_FlattenImportDeclarations = (node:ast.Module) => {
    let rootImports: ast.ImportDeclaration[] = []
    function addSubImport(path: ast.Id[], sub: ast.ImportDeclaration) {
        // change sub path to absolute
        sub.path = path.concat(sub.path)
        if (sub.as != null) {
            rootImports.push(new ast.ImportDeclaration(sub, {children: null}))
        }
        if (sub.children != null) {
            if (Array.isArray(sub.children)) {
                for (let child of sub.children) {
                    addSubImport(sub.path, child)
                }
            } else {
                rootImports.push(new ast.ImportDeclaration(sub, {as: null}))
            }
        }
    }
    for (let child of node.imports) {
        addSubImport([], child)
    }
    node.imports = rootImports
}

// const Module_NoVars = (node:any) => {
//     function failIfVar(declaration:any) {
//         if (Array.isArray(declaration)) {
//             for (let d of declaration) {
//                 failIfVar(d)
//             }
//         }
//         else if (declaration.type === 'VariableDeclaration' && declaration.kind !== 'let') {
//             fail(declaration, "Cannot export mutable variables")
//         }
//     }
//     failIfVar(node.declarations)
//     failIfVar(node.exports)
// }
// const IdDeclaration_CheckNoHideModuleNames = (node:any, ancestors:any[], path:string[]) => {
//     let {name} = node
//     let root = ancestors[0]
//     let moduleName = path[1]
//     if (root._names[name] && !moduleName.endsWith(name))
//         fail(node, "Cannot declare identifier with same name as local module: " + name)
// }
// const Module_DependenciesCreate = (node:any, ancestors:any[]) => {
//     node._dependencies = {}
// }
// const IdReference_ModuleDependenciesInit = (node:any, ancestors:any[]) => {
//     let {name} = node
//     let [assembly, , module] = ancestors
//     let modulePath = assembly._names[name]
//     if (modulePath) {
//         module._dependencies[modulePath] = {__location:node.__location}
//     }
// }
// const Assembly_ModuleOrderInit = (node:any) => {
//     let edges: [any,any,any][] = [] // third item is location of dependency IdReference
//     let tail = {}
//     // get all the module dependencies as edges
//     for (let modulePath in node.modules) {
//         let module = node.modules[modulePath]
//         let dependencies = module._dependencies
//         edges.push([modulePath, tail, null])
//         for (let dep in dependencies) {
//             edges.push([dep, modulePath, dependencies[dep]])
//         }
//     }
//     let lastRemovedEdge = null
//     while (true) {
//         let order
//         try {
//             order = toposort(edges).slice(0, -1) // slice to remove tail
//         }
//         catch (e) {
//             lastRemovedEdge = edges.pop()
//             continue
//         }
//         if (lastRemovedEdge != null) {
//             //  this means we have failed with a cyclic dependency
//             //  the last removed one must be the problem since it works now
//             let location = lastRemovedEdge[2].__location
//             fail(location, "Cyclic module dependencies are not supported")
//         }
//         node._moduleOrder = order
//         return
//     }
// }

// const _Literal_AddType = (node:any) => {
//     let {value} = node
//     if (typeof value === 'number') {
//         node.valueType = {type: "TypeReference", name:"Number", absolute:true}
//     }
//     if (typeof value === 'boolean') {
//         node.valueType = {type: "TypeReference", name:"Boolean", absolute:true}
//     }
//     if (typeof value === 'string') {
//         node.valueType = {type: "TypeReference", name:"String", absolute:true}
//     }
// }

// const _VariableDeclarator_ValueTypeInferFromValue = (node:any) => {
//     if (node.valueType == null && node.value != null && node.value.valueType != null) {
//         //  shared copy reference?? is this desirable?
//         node.valueType = node.value.valueType
//     }
// }

// const Assembly_NestModules = (node:any) => {
//     let rootModules: any = {modules:{}}
//     function getModule(steps:string[]): any {
//         if (steps.length == 0)
//             return rootModules
//         let parentModule = getModule(steps.slice(0, -1))
//         let name = steps[steps.length - 1]
//         let module = parentModule.modules[name]
//         if (module == null)
//             module = parentModule.modules[name] = {type:'Module',imports:[],declarations:[],exports:[],modules:{}}
//         return module
//     }

//     for (let path in node.modules) {
//         let module = node.modules[path]
//         let steps = path.split('.')
//         let parentPath = steps.slice(0, -1)
//         let parentModule = getModule(parentPath)
//         let name = steps[steps.length - 1]
//         parentModule.modules[name] = module
//     }
//     //  now replace root modules with this new modules
//     node.modules = rootModules.modules
// }

// const Module_ModulesToExports = (node: any) => {
//     for (let name in node.modules) {
//         let module = node.modules[name]
//         node.exports.push(
//             {
//                 type: 'VariableDeclaration',
//                 kind: 'let',
//                 declarations: [
//                     {
//                         type: 'VariableDeclarator',
//                         id: {type:'Id', name},
//                         init: module
//                     }
//                 ]
//             }
//         )
//     }
//     //  now remove modules
//     delete node.modules
// }

// const File_Write = (node:any) => {
//     console.log('Writing ' + node.path)
//     common.write(node.path, node.content, node.encoding)
// }

export const passes = [
    [Assembly_ModulePathInit],
    [Module_FlattenImportDeclarations],
    [ImportDeclaration_AddVariableBindings,ClassDeclaration_AddVariableBindings,VariableDeclaration_AddVariableBindings,Parameter_AddVariableBindings,ForInStatement_AddVariableBindings,TypeDeclaration_AddVariableBindings],
    [IdReference_TypeReference_CheckIfUnresolvedAndAddToModule],
    [Module_resolveReferences],
    // this should happen AFTER checking references are all valid
    [AssignmentStatement_CheckAssignable],
    // [Module_NoVars, Assembly_NamesInitAndModuleNameInit, IdDeclaration_CheckNoHideModuleNames],
    // [Module_DependenciesCreate, IdReference_ModuleDependenciesInit],
    // [_Literal_AddType,_VariableDeclarator_ValueTypeInferFromValue],
    // [Assembly_ModuleOrderInit, Assembly_NestModules],
    // [Module_ModulesToExports]
]
