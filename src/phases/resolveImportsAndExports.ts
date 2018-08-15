import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import ModuleCompiler from "../ModuleCompiler";
import { memoize } from "../functional"
const { ast } = require("../ion")

export type varEnter = (node, ancestors: object[], path: string[], variables: Map<String, object>) => void
export type varLeave = (node, ancestors: object[], path: string[], variables: Map<String, object>) => object | object[] | void

function traverseImportSteps(steps, callback) {
    for (let step of steps) {
        if (step.as != null) {
            callback(step.as, step)
        }
        if (step.children.length > 0) {
            traverseImportSteps(step.children, callback)
        }
    }
}

function foreachVariable(node, callback: (id, value, scopeNode) => any) {
    if (ast.FunctionExpression.is(node)) {
        for (let parameter of node.parameters) {
            callback(parameter.id, parameter, node)
        }
    }

    if (ast.BlockStatement.is(node)) {
        for (let statement of node.statements) {
            if (ast.Declaration.is(statement)) {
                callback(statement.id, statement, node)
            }
        }
    }

    if (ast.Module.is(node)) {
        traverseImportSteps(node.imports, callback)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration, node)
        }
    }

    if (ast.ClassDeclaration.is(node)) {
        callback(node.id, node, node)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration, node)
        }
        for (let parameter of node.templateParameters) {
            callback(parameter.id, parameter, node)
        }
    }
}

//  need a traversal with declarations
function traverseWithScopedVariables(root, { enter, leave }: { enter: varEnter, leave: varLeave }) {
    let scope = new Map()
    function add(id, node, sourceNode) {
        // console.log('+' + id.name)
        scope.set(id.name, node)
    }
    function remove(id, node, sourceNode) {
        // console.log('-' + id.name)
        scope.delete(id.name)
    }
    traverse(root, {
        enter(node: object, ancestors: object[], path: string[]) {
            foreachVariable(node, add)
            let result = enter ? enter(node, ancestors, path, scope) : undefined
            return result
        },
        leave(node: object, ancestors: object[], path: string[]) {
            let result = leave ? leave(node, ancestors, path, scope) : undefined
            foreachVariable(node, remove)
            return result
        }
    })
}

function joinPath(path, add) {
    return path.length > 0 ? path + "." + add : add
}

function getParentPath(path) {
    let index = path.lastIndexOf('.')
    return index < 0 ? path : path.slice(0, index)
}

//  TODO: Convert references to global references
export const getUnresolvedReferences = memoize(function(module) {
    // let referencesToRoot
    let unresolved = new Map<string, any>()
    traverseWithScopedVariables(module, {
        enter(node, ancestors, path, scope) {
            if (ast.Reference.is(node)) {
                if (!scope.has(node.name) && !unresolved.has(node.name)) {
                    // console.log({unresolved:node.name, path:path.join()})
                    unresolved.set(node.name, node)
                }
            }
        },
        leave(node, ancestors, path, scope) {
        }
    })
    return unresolved
})

function resolveName(moduleCompiler: ModuleCompiler, modulePath, name, steps, path = "") : string | null {
    for (let step of steps) {
        // root path relative
        let stepPath = path
        if (step.relative && stepPath.length == 0) {
            stepPath = getParentPath(modulePath)
        }
        let wildcard = step.as == null && step.id == null
        if (wildcard) {
            let fullPath = joinPath(stepPath, name)
            let externalPath = moduleCompiler.compiler.getExternalReferencePath(fullPath)
            if (externalPath != null)
                return externalPath
        }
        else if (step.id && step.children.length > 0) {
            let result = resolveName(moduleCompiler, modulePath, name, step.children, joinPath(path, step.id.name))
            if (result != null)
                return result
        }
    }
    return null
}

function convertImportStepsToDeclarations(moduleCompiler: ModuleCompiler, modulePath, steps, path = getParentPath(modulePath), declarations: any[] = []) {
    for (let step of steps) {
        if (step.id == null) {
            continue
        }
        let stepPath = step.relative ? joinPath(path, step.id.name) : step.id.name
        if (step.as != null) {
            let externalPath = moduleCompiler.compiler.getExternalReferencePath(stepPath)
            if (externalPath == null) {
                throw SemanticError(`Import path not found: ${stepPath}`, step.location)
            }
            declarations.push(
                new ast.VariableDeclaration({ id: step.as, value: new ast.Reference({ name: externalPath }) })
            )
        }
        if (step.children.length > 0) {
            convertImportStepsToDeclarations(moduleCompiler, modulePath, step.children, stepPath, declarations)
        }
    }
    return declarations
}

function resolveImportsAndExports(moduleCompiler: ModuleCompiler): any[] {

    let moduleName = moduleCompiler.name
    let module = moduleCompiler.parsedModule
    // add implicit imports
    let implicitAndExplicitImports = module.imports.concat([
        new ast.ImportStep({ relative: true, id: null, children:[] }), // .*
        new ast.ImportStep({ relative: false, id: new ast.Id({ name: "ion" }), children: [new ast.ImportStep({ relative: true, id: null, children:[] })] }), // ion.*
    ])
    //  find unresolved references
    let unresolved = getUnresolvedReferences(module)
    //  try to resolve references by using wildcard imports
    let resolved: Map<any,string> = new Map()
    for (let id of unresolved.values()) {
        let path = resolveName(moduleCompiler, moduleName, id.name, implicitAndExplicitImports)
        if (path) {
            //  remove resolved paths
            unresolved.delete(id.name)
            //  and add them to our resolved map
            resolved.set(id, path)
        }
        //  some things can't be resolved here, such as inherited variables
    }
    // convert all explicit imports into variables referencing the external canonical name
    let explicitImportDeclarations = convertImportStepsToDeclarations(moduleCompiler, moduleName, module.imports)
    // convert all resolved imports into variables referencing the external canonical name
    let resolvedImportDeclarations: any[] = []
    resolved.forEach(function (externalPath, id){
        resolvedImportDeclarations.push(
            new ast.VariableDeclaration({ id, value: new ast.Reference({ name: externalPath }) })
        )
    })

    //  now create a default object export...
    let defaultLibraryExports: any[] = []
    if (Array.isArray(module.exports)) {
        let namedExports = module.exports
        let elements = namedExports.map(declaration => new ast.KeyValuePair({ key: new ast.Id(declaration.id), value: new ast.Id(declaration.id) }))
        defaultLibraryExports.push(new ast.VariableDeclaration({
            id: new ast.Id({ name: moduleName }),
            value: new ast.ObjectLiteral({ type: "Object", elements })
        }))
    }

    //  normal module declarations need to be re-mapped
    //  any references to module-scoped

    return [...explicitImportDeclarations, ...resolvedImportDeclarations, ...defaultLibraryExports]

    // let declarations = memberStatements.concat(module.declarations)    
    // //  now resolve exports
    // let exports: any = null
    // if (Array.isArray(module.exports)) {
    //     let namedExports = module.exports
    //     let elements = namedExports.map(declaration => new ast.KeyValuePair({ key: new ast.Id(declaration.id), value: new ast.Id(declaration.id) }))
    //     exports = new ast.ExportStatement({ value: new ast.ObjectLiteral({ type: "Object", elements }) })
    //     declarations.push(...namedExports)
    // }
    // else {
    //     let defaultExport = module.exports
    //     declarations.push(defaultExport)
    //     exports = new ast.ExportStatement({ value: new ast.Reference(defaultExport.id) })
    // }

    // let statements = imports.concat(declarations, exports)
    // return new ast.BlockStatement({ statements })
}

export default resolveImportsAndExports

//  resolve capitalized imports