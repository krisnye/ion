import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import Compiler from "../Compiler2"
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

function foreachVariable(node, callback: (id, value) => any) {
    if (ast.Module.is(node)) {
        traverseImportSteps(node.imports, callback)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration)
        }
    }

    if (ast.ClassDeclaration.is(node)) {
        callback(node.id, node)
        for (let declaration of node.declarations) {
            callback(declaration.id, declaration)
        }
        for (let parameter of node.templateParameters) {
            callback(parameter.id, parameter)
        }
    }
}

//  need a traversal with declarations
function traverseWithScopedVariables(root, { enter, leave }: { enter: varEnter, leave: varLeave }) {
    let scope = new Map()
    function add(id, node) {
        // console.log('+' + id.name)
        scope.set(id.name, node)
    }
    function remove(id, node) {
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

function resolveName(compiler: Compiler, sourceNode, modulePath, name, steps, path = "") {
    for (let step of steps) {
        // root path relative
        let stepPath = path
        if (step.relative && stepPath.length == 0) {
            stepPath = getParentPath(modulePath)
        }
        let wildcard = step.as == null && step.id == null
        if (wildcard) {
            let fullPath = joinPath(stepPath, name)
            let ref = compiler.getExternalReference(fullPath, sourceNode)
            if (ref != null)
                return [fullPath, ref]
        }
        else if (step.id && step.children.length > 0) {
            let result = resolveName(compiler, sourceNode, modulePath, name, step.children, joinPath(path, step.id.name))
            if (result != null)
                return result
        }
    }
    return null
}

function convertImportStepsToVariables(compiler: Compiler, modulePath, steps, path = getParentPath(modulePath), variables: any[] = []) {
    for (let step of steps) {
        if (step.id == null) {
            continue
        }
        let stepPath = step.relative ? joinPath(path, step.id.name) : step.id.name
        if (step.as != null) {
            let ref = compiler.getExternalReference(stepPath)
            if (ref == null)
                throw SemanticError(`Import path not found: ${stepPath}`, step.location)
            variables.push(new ast.Variable(step, { id: step.as, value: ref }))
        }
        if (step.children.length > 0) {
            convertImportStepsToVariables(compiler, modulePath, step.children, stepPath, variables)
        }
    }
    return variables
}

function resolveImports(compiler: Compiler, moduleName, module) {
    let unresolved = getUnresolvedReferences(module)

    let implicitImports = module.imports.concat([
        new ast.ImportStep({ relative: true, id: null, children:[] }), // .*
        new ast.ImportStep({ relative: false, id: new ast.Id({ name: "ion" }), children: [new ast.ImportStep({ relative: true, id: null, children:[] })] }), // ion.*
    ])

    let resolved: { [name: string]: any /* : ast.ExternalReference */ } = {}
    for (let id of unresolved.values()) {
        let result = resolveName(compiler, id, moduleName, id.name, implicitImports)
        if (result) {
            let [path, ref] = result
            unresolved.delete(id.name)
            resolved[path] = [path, ref, id]
        }
        else {
            throw SemanticError(`Unresolved Id: ${id.name}`, id.location)
        }
    }

    // console.log(moduleName, Object.keys(resolved))

    let explicitImportVariables = convertImportStepsToVariables(compiler, moduleName, module.imports)
    let implicitImportVariables = Object.values(resolved).map(([path, ref, id]) => {
        return new ast.Variable(id, { id: new ast.Id(id), value: ref })
    })
    let importVariables = explicitImportVariables.concat(implicitImportVariables as any)
    return new ast.Module(module, { imports:[], declarations: importVariables.concat(module.declarations) })
}

export default resolveImports
