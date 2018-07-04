import { traverse, remove, skip, enter, leave, Visitor } from "../Traversal"
import { SemanticError } from "../common"
import ion from "../ion"
const { ast } = ion

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

function resolveName(root, modulePath, name, steps, path = "") {
    for (let step of steps) {
        // root path relative
        let stepPath = path
        if (step.relative && stepPath.length == 0) {
            stepPath = getParentPath(modulePath)
        }
        let wildcard = step.as == null && step.id == null
        if (wildcard) {
            let fullPath = joinPath(stepPath, name)
            let pathModule = root.modules.get(stepPath)
            if (pathModule && Array.isArray(pathModule.exports)) {
                // check the declarations O(n) time
                for (let declaration of pathModule.exports) {
                    if (declaration.id.name === name) {
                        return fullPath
                    }
                }
            }
            let fullPathModule = root.modules.get(fullPath)
            if (fullPathModule)
                return fullPath
        }
        else if (step.id && step.children.length > 0) {
            let result = resolveName(root, modulePath, name, step.children, joinPath(path, step.id.name))
            if (result != null)
                return result
        }
    }
    return null
}

function convertImportStepsToVariables(modulePath, steps, path = getParentPath(modulePath), variables = []) {
    for (let step of steps) {
        if (step.id == null) {
            continue
        }
        let stepPath = step.relative ? joinPath(path, step.id.name) : step.id.name
        if (step.as != null) {
            variables.push(new ast.Variable(step, {id:step.as, value: new ast.CanonicalReference(step.as, {name:stepPath})}))
        }
    }
    return variables
}

function resolveExternalReferences(root) {
    let newModules: Map<string,any> = new Map()
    //  now that we have unresolved... we will try to resolve them in each module
    for (let moduleName of root.modules.keys()) {
        let module = root.modules.get(moduleName)
        let unresolved = getUnresolvedReferences(module)

        let implicitImports = module.imports.concat([
            new ast.ImportStep({ relative: true, id: null, children:[] }), // .*
            new ast.ImportStep({ relative: false, id: new ast.Id({ name: "ion" }), children: [new ast.ImportStep({ relative: true, id: null, children:[] })] }), // ion.*
        ])

        let resolved: { [name: string]: any } = {}
        for (let id of unresolved.values()) {
            debugger
            let path = resolveName(root, moduleName, id.name, implicitImports)
            if (path) {
                unresolved.delete(id.name)
                resolved[path] = id
            }
            else {
                throw SemanticError(`Unresolved Id: ${id.name}`, id.location)
            }
        }

        // console.log(moduleName, Object.keys(resolved))

        let explicitImportVariables = convertImportStepsToVariables(moduleName, module.imports)
        let implicitImportVariables = Object.keys(resolved).map(path => {
            let id = new ast.Id(resolved[path])
            return new ast.Variable(id, { id, value: new ast.CanonicalReference(id, { name: path })})
        })
        let importVariables = explicitImportVariables.concat(implicitImportVariables)
        let newModule = new ast.Module(module, { imports:[], declarations: importVariables.concat(module.declarations) })

        newModules.set(moduleName, newModule)
    }

    return new ast.InputRoot(root, { modules: newModules })
}

export default resolveExternalReferences
