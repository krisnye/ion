import * as fs from "fs"
import * as np from "path"
import * as ast from "./IonAst"

////////////////////////////////////////////////////////////////////////////////
//  Miscelaneous Functions
////////////////////////////////////////////////////////////////////////////////

export function freeze(object: any, deep: boolean = true) {
    if (object != null && typeof object === 'object') {
        Object.freeze(object)
        if (deep) {
            for (let name in object) {
                freeze(object[name])
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
//  Set Functions
////////////////////////////////////////////////////////////////////////////////

export function union(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a)
        result.add(e)
    for (let e of b)
        result.add(e)
    return result
}

export function intersection(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (b.has(e))
            result.add(e)
    }
    return result
}

export function difference(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (!b.has(e))
            result.add(e)
    }
    return result
}

////////////////////////////////////////////////////////////////////////////////
//  File operations
////////////////////////////////////////////////////////////////////////////////

export function read(file: any) {
    return fs.readFileSync(file, 'utf8')
}

export function getFilesRecursive(directory: string, allFiles: string[] = []) {
    for (let file of fs.readdirSync(directory)) {
        let fullPath = np.join(directory, file)
        if (fs.statSync(fullPath).isFile()) {
            allFiles.push(fullPath)
        }
        else {
            getFilesRecursive(fullPath, allFiles)
        }
    }
    return allFiles
}

export function exists(file: string) { return fs.existsSync(file) }

export function makeDirectories(dir: string) {
    if (!exists(dir)) {
        // make parent first
        makeDirectories(np.dirname(dir))
        // make self
        fs.mkdirSync(dir)
    }
}

export function write(file:string, content:string, encoding?:string) {
    makeDirectories(np.dirname(file))
    if (content != null) {
        if (encoding === undefined && typeof content === 'string')
            encoding = 'utf8'
        fs.writeFileSync(file, content, {encoding})
    }
    else if (exists(file)) {
        fs.unlinkSync(file)
    }
}

////////////////////////////////////////////////////////////////////////////////
//  Semantic failure
////////////////////////////////////////////////////////////////////////////////

export function fail(node: any, message: string) {
    let error: any = new Error(message)
    let location = node.__location || node
    error.location = location
    throw error
}

////////////////////////////////////////////////////////////////////////////////
//  Variables, Scope, Binding
////////////////////////////////////////////////////////////////////////////////

function* getScopes(self: ast.Node | null, ancestors: object[]) {
    if (self instanceof ast.Scope)
        yield self
    for (let i = ancestors.length - 1; i >= 0; i--) {
        let node = ancestors[i]
        if (node instanceof ast.Scope)
            yield node
    }
}

export const getScope = (self: ast.Node | null, ancestors: object[]) => {
    for (let scope of getScopes(self, ancestors)) {
        return scope
    }
    throw new Error("Scope not found")
}

export const getScopedId = (self: ast.Node, ancestors: object[], name: string) => {
    for (let scope of getScopes(self, ancestors)) {
        let id = scope._variables[name]
        if (id != null)
            return id
    }
    return null
}

export const addVariableBinding = (scope: ast.Scope, id: ast.Id) => {
    let { name } = id
    if (scope._variables[name] != null)
        fail(id, `Cannot redeclare '${name}'`)
    scope._variables[name] = id
}

////////////////////////////////////////////////////////////////////////////////
//  Traversing ancestors
////////////////////////////////////////////////////////////////////////////////

export const getFirstOfType = (type: any, array: object[]) => {
    for (let element of array) {
        if (element instanceof type)
            return element
    }
    return null
}

export const getModule: (ancestors: object[]) => ast.Module = getFirstOfType.bind(null, ast.Module)

