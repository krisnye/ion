import { traverse, remove, skip, Visitor } from "../Traversal"
import toposort from "../toposort"
// import * as escodegen from "escodegen"
import * as c from "../common"
import * as ast from "../IonAst"

// const Node_SetPath = (node: ast.Node, ancestors: object[], path:string[]) => {
//     node.__path = path.slice(0)
// }

const Assembly_NestModulesInNamespaces = (node: ast.Assembly) => {
    // replace current node.namespaces
    let namespaces = node.namespaces
    node.namespaces = {}

    function getNamespace(path: string[]): ast.Namespace {
        if (path.length == 0)
            return node

        let parentNamespace = getNamespace(path.slice(0, -1))
        let name = path[path.length-1]
        let namespace = parentNamespace.namespaces[name]
        if (namespace == null)
            namespace = parentNamespace.namespaces[name] = new ast.Namespace({ path: path.slice(0), namespaces: {} })
        return namespace
    }

    for (let pathString in namespaces) {
        let module = namespaces[pathString]
        let path = pathString.split('.')
        let name = path[path.length - 1]
        module.path = path.slice(0)
        let namespace = getNamespace(path.slice(0, -1))
        namespace.namespaces[name] = module
    }

    return skip
}

const Assembly_NoOp = (node: ast.Module) => {
    return skip
}

const Module_AddPublicPathToExports = (node: ast.Module, ancestors: object[]) => {
    if (node._variables) {
        let path = ancestors.filter(a => a instanceof ast.Namespace && a.name != null).map((n: ast.Namespace) => n.name).join('.')
        //  if we have multiple exports then add our module id
        if (Array.isArray(node.exports))
            path += "." + node.id
        //  now add public path to variable bindings
        for (let name in node._variables) {
            let binding = node._variables[name]
            binding.id = path + "." + name
        }
    }
}

const Module_DebugValues = (node: ast.Module, ancestors: object[]) => {
    for (let name in node._variables) {
        let variable = node._variables[name]
        console.log(variable.id)
    }
}

const VariableDeclaration_AddVariableBindings = (node: ast.VariableDeclaration, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    scope.addVariable(node.id, node)
}
const Parameter_AddVariableBindings = (node: ast.Parameter, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    if (node.pattern instanceof ast.Id) {
        scope.addVariable(node.pattern, node)
    }
    else {
        node.pattern.throwSemanticError("Patterns not supported yet")
    }
}
const Namespace_AddVariableBindings = (node: ast.Namespace, ancestors: object[]) => {
    // place class name into parent scope as type variable
    let scope = ast.getScope(null, ancestors)
    scope.addVariable(new ast.Id({name:node.name}), node)
}
const ForInStatement_AddVariableBindings = (node: ast.ForInStatement, ancestors: object[]) => {
    console.log('For..in..variables not done')
    // let scope = ast.getScope(node, ancestors)
    // scope.addVariable(node.left)
}
const ClassDeclaration_AddVariableBindings = (node: ast.ClassDeclaration, ancestors: object[]) => {
    // place class name into parent scope as type variable
    let scope = ast.getScope(null, ancestors)
    scope.addVariable(node.id, node)
}
const ImportDeclaration_AddVariableBindings = (node: ast.ImportDeclaration, ancestors: object[]) => {
    // if (node.as != null) {
    //     let scope = ast.getScope(null, ancestors)
    //     scope.addVariable(node.as)
    // }
}
const Module_AddVariableBindingsAndInitModuleId = (node: ast.Module, ancestors: object[]) => {
    node.id = new ast.Id({name:node.name})
    let scope = ast.getScope(null, ancestors)
    if (ast.isExpression(node.exports)) {
        scope.addVariable(node.id, node.exports)
    } else {
        // library values will already be added to 'this' node's scope
        // console.log('export library or something?')
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
        let foundModules: ast.Expression[] = []
        for (let rootImport of node.imports) {
            let assembly = <ast.Assembly>ancestors[0]
            if (rootImport.children === true) {
                // let referencedNamespace = rootImport.getReferencedNamespace(node, assembly)
                // if (referencedNamespace) {
                //     let variable = referencedNamespace._variables[name]
                //     if (variable) {
                //         foundModules.push(variable.value)
                //     }
                // }

                // let checkPath = rootImport.pathString + "." + name
                // let referencedModule = assembly.namespaces[checkPath]
                // if (referencedModule != null) {
                //     foundModules.push(referencedModule)
                // }
            }
        }

        // if (foundModules.length == 0) {
        //     reference.throwSemanticError(`'${name}' could not be resolved`)
        // } else if (foundModules.length > 1) {
        //     reference.throwSemanticError(`'${name}' resolves ambiguously to ${foundModules.map(x => x.name).join(', ')}`)
        // } else {
        //     let foundModule = foundModules[0]
        //     //  add new specific import declaration
        //     let newImport = new ast.ImportDeclaration({ path: foundModule.path.map(name => new ast.Id({ name })), children: null, as: reference.id, relative: 0 })
        //     node.imports.push(newImport)
        //     //  declare new binding
        //     ImportDeclaration_AddVariableBindings(newImport, ancestors.concat([node]))
        //     //  remove reference from unresolved
        //     delete node.unresolvedReferences[name]
        // }
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

// const Assembly_ModulePathInit = (node:ast.Assembly) => {
//     for (let modulePath in node.namespaces) {
//         let module = node.namespaces[modulePath]
//         module.path = modulePath.split('.')
//     }
// }

const Module_FlattenImportDeclarations = (node: ast.Module) => {
    let rootImports: ast.ImportDeclaration[] = []
    function addSubImport(path: ast.Id[], sub: ast.ImportDeclaration) {
        // change sub path to absolute
        sub.path = path.concat(sub.path)
        if (sub.as != null) {
            rootImports.push(new ast.ImportDeclaration(sub, { children: null }))
        }
        if (sub.children != null) {
            if (Array.isArray(sub.children)) {
                for (let child of sub.children) {
                    addSubImport(sub.path, child)
                }
            } else {
                rootImports.push(new ast.ImportDeclaration(sub, { as: null }))
            }
        }
    }
    for (let child of node.imports) {
        addSubImport([], child)
    }
    node.imports = rootImports
}

const Module_ImportsRelativeToAbsolute = (node: ast.Module, ancestors: object[]) => {
    for (let rootImport of node.imports) {
        //  convert relative import to absolute
        if (rootImport.relative > 0) {
            rootImport.path = node.path.slice(0, - rootImport.relative).map(name => new ast.Id({ name })).concat(rootImport.path)
            rootImport.relative = 0
        }
    }
}

const Module_ImportsResolveToModules = (node: ast.Module, ancestors: object[]) => {
    let assembly = <ast.Assembly>ancestors[0]
    for (let rootImport of node.imports) {
        let path = rootImport.pathString
        let referencedModule = assembly.namespaces[path]
        if (referencedModule == null)
            rootImport.throwSemanticError(`'${path}' module not found`)
        if (referencedModule == node)
            rootImport.throwSemanticError(`cannot import self`)
    }
}

const expressionAncestors: Map<ast.Expression,Object[]> = new Map()
const Node_AddDependenciesToAssembly = (node: any, ancestors: object[], path: string[]) => {
    let assembly = <ast.Assembly>ancestors[0]
    if (node.getDependencies != null) {
        expressionAncestors.set(node, ancestors.slice(0))
        let enode = <ast.Expression>node
        let deps = enode.getDependencies(ancestors)
        for (let dep of deps) {
            if (dep == null) {
                console.warn("Missing dep: " + enode)
            } else {
                assembly._expressionDependencies.push([dep, enode])
            }
        }
    }
}
const _Assembly_ToposortTypes = (node: ast.Assembly) => {
    let deps = node._expressionDependencies
    let sortedDeps = toposort(deps)
    // now we must simplify all references
    for (let expression of sortedDeps) {
        console.log((expression.resolve != null ? 1 : 0) + " Resolve: " + expression.toDebugString())
        if (expression.resolve != null) {
            let ancestors = expressionAncestors.get(expression)
            expression.resolve(ancestors)
        }
    }
}

export const passes = [
    // //  Phase 0: initialization and adding variable bindings
    // [Assembly_NestModulesInNamespaces /*, Node_SetPath */],
    // [Module_FlattenImportDeclarations],
    // [ImportDeclaration_AddVariableBindings, ClassDeclaration_AddVariableBindings, VariableDeclaration_AddVariableBindings, Parameter_AddVariableBindings, ForInStatement_AddVariableBindings, Namespace_AddVariableBindings],
    // [Module_AddVariableBindingsAndInitModuleId],
    // //  Phase 1: check for unresolved references
    // [Module_ImportsRelativeToAbsolute, Reference_CheckIfUnresolvedAndAddToModule],
    // //  Phase 2: attempt to resolve references
    // [Module_UnresolvedReferencesResolve, Module_ImportsResolveToModules],

    // //  Prepare for converstion to IRT
    // [Module_AddPublicPathToExports],
    // [Module_DebugValues]
    // // //  Phase 3: Type calculation
    // // [Node_AddDependenciesToAssembly, _Assembly_ToposortTypes],

    // // //  Phase 4: check semantic validity
    // // [AssignmentStatement_CheckAssignable]
]
