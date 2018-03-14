import { traverse, remove, skip, Visitor } from "../Traversal"
import toposort from "../toposort"
import * as c from "../common"
import * as ast from "../IonAst"

const Assembly_NoOp = (node: ast.Module) => {
    return skip
}

// const Module_AddPublicPathToExports = (node: ast.Module, ancestors: object[]) => {
//     if (node._variables) {
//         let path = ancestors.filter(a => a instanceof ast.Namespace && a.name != null).map((n: ast.Namespace) => n.name).join('.')
//         //  if we have multiple exports then add our module id
//         if (Array.isArray(node.exports))
//             path += "." + node.id
//         //  now add public path to variable bindings
//         for (let name in node._variables) {
//             let binding = node._variables[name]
//             binding.id = path + "." + name
//         }
//     }
// }

const Module_DebugValues = (node: ast.Module, ancestors: object[]) => {
    for (let name in node._variables) {
        let variable = node._variables[name]
        console.log(variable.id)
    }
}

const VariableDeclaration_AddVariableBindings = (node: ast.VariableDeclaration, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    scope.addVariable(node.id, node.value, node.type)
}
const Parameter_AddVariableBindings = (node: ast.Parameter, ancestors: object[]) => {
    let scope = ast.getScope(node, ancestors)
    if (node.pattern instanceof ast.Id) {
        scope.addVariable(node.pattern, node, node.type)
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
    if (node.as != null) {
        let scope = ast.getScope(null, ancestors)
        scope.addVariable(node.as, null)
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
    let assembly: ast.Assembly = <any>ancestors[0]
    for (let name in node.unresolvedReferences) {
        let reference = node.unresolvedReferences[name]
        let foundModules: ast.Module[] = []
        for (let rootImport of node.imports) {
            let assembly = <ast.Assembly>ancestors[0]
            if (rootImport.children === true) {
                let referencedModule = <ast.Module>assembly.namespaces[rootImport.path.map(x => x.name).join('.')]
                if (referencedModule) {
                    let variable = referencedModule._variables[name]
                    if (variable && variable.value) {
                        foundModules.push(referencedModule)
                    }
                }

                // let checkPath = rootImport.pathString + "." + name
                // let referencedModule = assembly.namespaces[checkPath]
                // if (referencedModule != null) {
                //     foundModules.push(referencedModule)
                // }

            }
        }

        if (foundModules.length == 0) {
            reference.throwSemanticError(`'${name}' could not be resolved`)
        } else if (foundModules.length > 1) {
            reference.throwSemanticError(`'${name}' resolves ambiguously to ${foundModules.map(x => x.name).join(', ')}`)
        } else {
            let foundModule = foundModules[0]
            //  add new specific import declaration
            let newImport = new ast.ImportDeclaration({ path: foundModule.path.map(name => new ast.Id({ name })).concat(reference.id), children: null, as: reference.id, relative: 0 })
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
    for (let modulePath in node.namespaces) {
        let module = node.namespaces[modulePath]
        module.path = modulePath.split('.')
    }
}

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

function filterAllNodes(node: any, filter: (object: any) => any) {
    if (node != null && typeof node == 'object') {
        let filtered = filter(node)
        if (filtered !== node)
            return filtered
        for (let name in node) {
            let value = filterAllNodes(node[name], filter)
            if (node[name] !== value)
                node[name] = value
        }
    }
    return node
}
let ancestorMap = new Map<ast.Expression,object[]>()
const Node_AddDependenciesToIrtRoot = (node: any, ancestors: object[], path: string[]) => {
    let module = <ast.IrtRoot>ancestors[0]
    if (ast.isExpression(node)) {
        // we only need to store ancestors IF the node has a simplify method
        if (node.simplify)
            ancestorMap.set(node, ancestors.slice(0))
        let deps = node.getDependencies(ancestors)
        for (let dep of deps) {
            if (dep == null) {
                console.warn("Missing dep: " + node)
            } else {
                module._expressionDependencies.push([dep, node])
            }
        }
    }
}
const _IrtRoot_ToposortTypes = (node: ast.IrtRoot) => {
    let deps = node._expressionDependencies
    let sortedDeps: ast.Expression[] = toposort(deps)
    // we need to know the relative order of each of our root declarations
    {
        let sortedNames: string[] = []
        let expressionToIndex: Map<ast.Expression,number> = new Map()
        for (let i = 0; i < sortedDeps.length; i++) {
            expressionToIndex.set(sortedDeps[i], i)
        }
        let indexNamePairs: [number, string][] = []
        for (let name in node.values) {
            let expression = node.values[name]
            let index = <number>expressionToIndex.get(expression)
            indexNamePairs.push([index, name])
        }
        indexNamePairs.sort((a, b) => a[0] - b[0])
        for (let [index, name] of indexNamePairs) {
            sortedNames.push(name)
        }
        //  now let's redefine the values in the correct dependency order
        let sortedValues: {[name: string]: ast.Expression} = {}
        for (let name of sortedNames) {
            sortedValues[name] = node.values[name]
        }
        node.values = sortedValues
    }

    // now we must simplify all references
    let simplifiedMap = new Map<ast.Expression,ast.Expression>()
    let filter = (expression: ast.Expression) => simplifiedMap.get(expression) || expression
    // 
    for (let expression of sortedDeps) {
        console.log("Resolve: " + expression.toDebugString())
        if (expression.simplify != null) {
            let simplified = expression.simplify(<object[]>ancestorMap.get(expression), filter)
            if (simplified != null) {
                simplifiedMap.set(expression, simplified)
            }
        }
    }
    // now replace all old expressions with new simplified values
    filterAllNodes(node, filter)

    ancestorMap.clear()

    delete node._expressionDependencies
}

const Module_ConvertImportsToCanonicalReferences = (node: ast.Module, ancestors: object[]) => {
    for (let importDeclaration of node.imports) {
        let path = importDeclaration.path.map(x => x.name).join('.')
        let as = importDeclaration.as
        if (as == null)
            importDeclaration.throwSemanticError("As should be defined by now")
        node.declarations.unshift(new ast.VariableDeclaration({id:as,value:new ast.CanonicalReference(path)}))
    }
    // now remove all imports
    node.imports = []
}

const Module_AddCanonicalReferences = (node: ast.Module, ancestors: object[]) => {
    function addCanonicalReference(declaration: ast.Declaration, addName: boolean = true, privat: boolean = false) {
        let variableBinding = node.getVariable(ancestors, declaration.id.name)
        if (variableBinding == null) {
            return node.throwSemanticError("Variable for declaration: " + declaration.id.name + " not found")
        }
        let path = node.path.join('.')
        if (addName)
            path += '.' + (privat ? '$' : '') + declaration.id.name
        variableBinding.canonicalId = path
    }
    for (let declaration of node.declarations) {
        addCanonicalReference(declaration, true, true)
    }
    if (Array.isArray(node.exports)) {
        for (let declaration of node.exports) {
            addCanonicalReference(declaration)
        }
    } else {
        addCanonicalReference(node.exports, false)
    }
}

const __Reference_ConvertToCanonicalReference = (node: ast.Reference, ancestors: object[]) => {
    let variable = node.getVariable(ancestors, node.id.name)
    if (variable && variable.canonicalId) {
        return new ast.CanonicalReference(variable.canonicalId)
    }
    return node
}

let extractValues: { [name: string]: ast.Expression } = {}
const VariableDeclaration_ClassDeclaration_ExtractValues = (node: ast.Declaration, ancestors: object[]) => {
    let variable = node.getVariable(ancestors, node.id.name)
    if (variable && variable.canonicalId) {
        if (node.value == null) {
            node.throwSemanticError("missing value")
            return
        }
        extractValues[variable.canonicalId] = node.value
    }
}

const __Assembly_ConvertToIrt = (node: ast.Assembly) => {
    let irtAssembly = new ast.IrtRoot({values:extractValues})
    extractValues = {}
    return irtAssembly
}

export const passes = [
    //  initialization and adding variable bindings
    [Assembly_ModulePathInit, Module_FlattenImportDeclarations],
    [ImportDeclaration_AddVariableBindings, ClassDeclaration_AddVariableBindings, VariableDeclaration_AddVariableBindings, Parameter_AddVariableBindings, ForInStatement_AddVariableBindings, Namespace_AddVariableBindings],
    //  check for unresolved references
    [Module_ImportsRelativeToAbsolute, Reference_CheckIfUnresolvedAndAddToModule],
    //  attempt to resolve missing references using import.*
    [Module_UnresolvedReferencesResolve],
    // [Module_ImportsResolveToModules],
    [Module_ConvertImportsToCanonicalReferences, Module_AddCanonicalReferences, __Reference_ConvertToCanonicalReference],
    //  Convert to Intermediate Representation
    [VariableDeclaration_ClassDeclaration_ExtractValues, __Assembly_ConvertToIrt],

    // [Module_AddPublicPathToExports],
    // [Module_DebugValues]
    //  Phase 3: Type calculation
    [Node_AddDependenciesToIrtRoot, _IrtRoot_ToposortTypes],

    //  Phase 4: check semantic validity
    // [AssignmentStatement_CheckAssignable]
]
