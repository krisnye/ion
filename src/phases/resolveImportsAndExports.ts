import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import ModuleCompiler from "../ModuleCompiler";
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

function getUnresolvedReferences(module) {
    let unresolved = new Map<String, any>()
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
}

function getParentPath(path) {
    let index = path.lastIndexOf('.')
    return index < 0 ? path : path.slice(0, index)
}

function resolveName(moduleCompiler: ModuleCompiler, modulePath, name, steps, path = "") {
    for (let step of steps) {
        // root path relative
        let stepPath = path
        if (step.relative && stepPath.length == 0) {
            stepPath = getParentPath(modulePath)
        }
        let wildcard = step.as == null && step.id == null
        if (wildcard) {
            let fullPath = joinPath(stepPath, name)
            let ref = moduleCompiler._getExternalReference(fullPath)
            if (ref != null)
                return [fullPath, ref]
        }
        else if (step.id && step.children.length > 0) {
            let result = resolveName(moduleCompiler, modulePath, name, step.children, joinPath(path, step.id.name))
            if (result != null)
                return result
        }
    }
    return null
}

function convertImportStepToDeclarationAndMemberStatement(ref, id, importDeclarations, memberStatements) {
    id = new ast.Id(id) //  convert to Id since the id might be a Reference or TypeReference
    if (ref.exportName != null) {
        let moduleVarName = `_${ref.moduleName.replace(/\./g, '_')}_`
        importDeclarations.push(
            new ast.ImportDeclaration({
                id: new ast.Id({ name: moduleVarName }),
                module: new ast.Id({ name: ref.moduleName })
            })
        )
        memberStatements.push(
            new ast.VariableDeclaration({
                id: id,
                value: new ast.MemberExpression({
                    object: new ast.Reference({ name: moduleVarName }),
                    property: new ast.Id({ name: ref.exportName })
                })
            })
        )
    }
    else {
        importDeclarations.push(new ast.ImportDeclaration({ id:id, module: new ast.Id({ name:ref.moduleName }) }))
    }
}

function convertImportStepsToDeclarations(moduleCompiler: ModuleCompiler, modulePath, steps, path = getParentPath(modulePath), importDeclarations: any[] = [], memberStatements: any[] = []) {
    for (let step of steps) {
        if (step.id == null) {
            continue
        }
        let stepPath = step.relative ? joinPath(path, step.id.name) : step.id.name
        if (step.as != null) {
            let ref = moduleCompiler._getExternalReference(stepPath)
            if (ref == null)
                throw SemanticError(`Import path not found: ${stepPath}`, step.location)
            convertImportStepToDeclarationAndMemberStatement(ref, step.as, importDeclarations, memberStatements)
        }
        if (step.children.length > 0) {
            convertImportStepsToDeclarations(moduleCompiler, modulePath, step.children, stepPath, importDeclarations)
        }
    }
    return [importDeclarations, memberStatements]
}

function resolveImportsAndExports(moduleCompiler: ModuleCompiler) {
    let moduleName = moduleCompiler.name
    let module = moduleCompiler.getParsedModule()
    let unresolved = getUnresolvedReferences(module)
    let implicitImports = module.imports.concat([
        new ast.ImportStep({ relative: true, id: null, children:[] }), // .*
        new ast.ImportStep({ relative: false, id: new ast.Id({ name: "ion" }), children: [new ast.ImportStep({ relative: true, id: null, children:[] })] }), // ion.*
    ])
    let resolved: { [name: string]: any /* : ast.ExternalReference */ } = {}
    for (let id of unresolved.values()) {
        let result = resolveName(moduleCompiler, moduleName, id.name, implicitImports)
        if (result) {
            unresolved.delete(id.name)
            if (ast.Expression.is(result)) {
                console.log('found expression result', result)
            }
            else {
                let [path, ref] = result
                resolved[path] = [path, ref, id]
            }
        }
        // else {
        //     console.info(`Undeclared Identifier: ${id.name}`, id.location)
        // }
    }
    let [imports, memberStatements] = convertImportStepsToDeclarations(moduleCompiler, moduleName, module.imports, )
    for (let name in resolved) {
        let [path, ref, id] = resolved[name]
        convertImportStepToDeclarationAndMemberStatement(ref, id, imports, memberStatements)
    }
    let declarations = memberStatements.concat(module.declarations)    
    //  now resolve exports
    let exports: any = null
    if (Array.isArray(module.exports)) {
        let namedExports = module.exports
        let elements = namedExports.map(declaration => new ast.KeyValuePair({ key: new ast.Id(declaration.id), value: new ast.Id(declaration.id) }))
        exports = new ast.ExportStatement({ value: new ast.ObjectLiteral({ type: "Object", elements }) })
        declarations.push(...namedExports)
    }
    else {
        let defaultExport = module.exports
        declarations.push(defaultExport)
        exports = new ast.ExportStatement({ value: new ast.Reference(defaultExport.id) })
    }

    let statements = imports.concat(declarations, exports)
    return new ast.BlockStatement({ statements })
}

export default resolveImportsAndExports

//  resolve capitalized imports