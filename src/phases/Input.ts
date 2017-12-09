import {traverse,remove,skip,Visitor} from "../Traversal"
// import toposort from "../toposort"
// import * as escodegen from "escodegen"
import * as c from "../common"
import * as ast from "../IonAst"

const VariableDeclaration_AddVariableBindings = (node: ast.VariableDeclaration, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    scope.addVariable(node.id)
}
const Parameter_AddVariableBindings = (node: ast.Parameter, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    if (!(node.pattern instanceof ast.Id)) {
        node.throwSemanticError("Patterns not supported yet")
    }
    scope.addVariable(<ast.Id>node.pattern)
}
const ForInStatement_AddVariableBindings = (node: ast.ForInStatement, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    if (!(node.left instanceof ast.Id)) {
        node.throwSemanticError("Patterns not supported yet")
    }
    scope.addVariable(<ast.Id>node.left)
}
const TypeDeclaration_AddVariableBindings = (node: ast.TypeDeclaration, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    scope.addVariable(node.id)
}
const ClassDeclaration_AddVariableBindings = (node: ast.ClassDeclaration, ancestors: object[]) => {
    // place class name into parent scope as type variable
    let scope = ast.getScope(null, ancestors)
    scope.addVariable(node.id)
}
const ImportDeclaration_AddVariableBindings = (node: ast.ImportDeclaration, ancestors: object[]) => {
    if (node.as != null) {
        let scope = ast.getScope(null, ancestors)
        scope.addVariable(node.as)
    }
}

const Reference_CheckIfUnresolvedAndAddToModule = (node: ast.Reference, ancestors: object[]) => {
    let name = node.id.name
    let variable = node.getVariable(ancestors, name)
    if (variable == null) {
        let module = ast.getModule(ancestors)
        if (module.unresolvedReferences[name] == null) {
            module.unresolvedReferences[name] = node
        }
    }
}

const Module_UnresolvedReferencesResolve = (node: ast.Module, ancestors: object[]) => {
    for (let name in node.unresolvedReferences) {
        let reference = node.unresolvedReferences[name]
        let foundModules: ast.Module[] = []
        for (let rootImport of node.imports) {
            let assembly = <ast.Assembly>ancestors[0]
            if (rootImport.children === true) {
                let checkPath = rootImport.pathString + "." + name
                let referencedModule = assembly.modules[checkPath]
                if (referencedModule != null) {
                    foundModules.push(referencedModule)
                }
            }
        }
        if (foundModules.length == 0) {
            reference.throwSemanticError(`'${name}' could not be resolved`)
        } else if (foundModules.length > 1) {
            reference.throwSemanticError(`'${name}' resolves ambiguously to ${foundModules.map(x => x.name).join(', ')}`)
        } else {
            let foundModule = foundModules[0]
            //  add new specific import declaration
            let newImport = new ast.ImportDeclaration({ path:foundModule.path.map(name => new ast.Id({name})), children: null, as: reference.id, relative: 0 })
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

// const AssignmentStatement_CheckAssignable = (node: ast.AssignmentStatement, ancestors: object[]) => {
//     if (node.left instanceof ast.Id) {
//         let variable = c.getScopedId(node, ancestors, node.left.name)
//         if (variable != null && !variable.assignable)
//             c.fail(node.left, `'${node.left.name}' is not assignable`)
//     }
// }

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

const Module_ImportsRelativeToAbsolute = (node:ast.Module, ancestors: object[]) => {
    for (let rootImport of node.imports) {
        //  convert relative import to absolute
        if (rootImport.relative > 0) {
            rootImport.path = node.path.slice(0, - rootImport.relative).map(name => new ast.Id({name})).concat(rootImport.path)
            rootImport.relative = 0
        }
    }
}

const Module_ImportsResolveToModules = (node: ast.Module, ancestors: object[]) => {
    let assembly = <ast.Assembly>ancestors[0]
    for (let rootImport of node.imports) {
        let path = rootImport.pathString
        let referencedModule = assembly.modules[path]
        if (referencedModule == null)
            rootImport.throwSemanticError(`'${path}' module not found`)
        if (referencedModule == node)
            rootImport.throwSemanticError(`cannot import self`)
    }
}

const Node_AddDependenciesToAssembly = (node: any, ancestors:object[], path: string[]) => {
    let assembly = <ast.Assembly>ancestors[0]
    if (node.getDependencies != null) {
        let deps = node.getDependencies(ancestors, path)
        console.log('Expression: ' + node)
    }
}

const _Assembly_ToposortTypes = (node: ast.Assembly) => {
    console.log('TOPOSORT BITCHES')
}

export const passes = [
    //  Phase 0: initialization and adding variable bindings
    [Assembly_ModulePathInit, Module_FlattenImportDeclarations, ImportDeclaration_AddVariableBindings,ClassDeclaration_AddVariableBindings,VariableDeclaration_AddVariableBindings,Parameter_AddVariableBindings,ForInStatement_AddVariableBindings,TypeDeclaration_AddVariableBindings],
    //  Phase 1: check for unresolved references
    [Module_ImportsRelativeToAbsolute, Reference_CheckIfUnresolvedAndAddToModule],
    //  Phase 2: attempt to resolve references
    [Module_UnresolvedReferencesResolve, Module_ImportsResolveToModules],
    //  Phase 3: Type calculation
    [Node_AddDependenciesToAssembly, _Assembly_ToposortTypes],
    // // //  Phase 4: check semantic validity
    // // [AssignmentStatement_CheckAssignable]
]
