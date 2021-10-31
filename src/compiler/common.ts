import * as fs from "fs";
import * as np from "path";
import { traverse, skip } from "@glas/traverse";
import { NodeMap, ScopeMap } from "./createScopeMaps";
import { Reference, Node, Variable, ModuleSpecifier, ImportDeclaration, Declarator, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Declaration, Statement, Identifier, Block } from "./ast";

export const runtimeModuleName = "ionscript"

function isUpperCase(name) {
    let first = name[0]
    return first === first.toUpperCase()
}

export function isMetaName(name) {
    return name[0] === "@"
}

export function isTypeName(name) {
    return !isMetaName(name) && isUpperCase(name)
}

export function isValueName(name) {
    return !isMetaName(name) && !isTypeName(name)
}

export function combineStatements(...statements: Statement[]) {
    let first = statements[0]
    if (statements.length === 1) {
        return first
    }
    let body = new Array<Statement>()
    for (let statement of statements) {
        if (Block.is(statement)) {
            body.push(...statement.body)
        }
        else {
            body.push(statement)
        }
    }
    return new Block({ location: first.location, body })
}

export function hasNodesOfType<T>(root, predicate: (node) => node is T) {
    // could optimize a bit later.
    return getNodesOfType(root, predicate).length > 0
}

export function getNodesOfType<T>(root, predicate: (node) => node is T) {
    let nodes = new Array<T>()
    traverse(root, {
        enter(node) {
            if (predicate(node)) {
                nodes.push(node)
            }
        }
    })
    return nodes
}

export function memoizeIntern<A extends any, B>(fn: (a: A) => B): (a: A) => B {
    const cache = new Map<A, B>()
    return (memoize as any)(fn, false, cache)
}

export function memoize<A extends object, B>(fn: (a: A, ...rest) => B, cacheResultAsKey = false, cache: WeakMap<A, B> = new WeakMap()): (a: A) => B {
    return function(this, arg) {
        let result = cache.get(arg)
        if (result === undefined) {
            cache.set(arg, result = fn.apply(this, arguments as any))
            if (cacheResultAsKey) {
                cache.set(result as any as A, result)
            }
        }
        return result
    }
}

const validIdRegex = /^[a-z_][a-z0-9_]*$/i
export function isValidId(name: string) {
    return validIdRegex.test(name)
}

////////////////////////////////////////////////////////////////////////////////
//  Miscelaneous Functions
////////////////////////////////////////////////////////////////////////////////

//  quick check for a declarator without creating a scope map
export function hasDeclarator(statements: Array<Statement>, name: string) {
    // console.log(statements)
    for (let s of statements) {
        if (ImportDeclaration.is(s)) {
            for (let specifier of s.specifiers) {
                if (ModuleSpecifier.is(specifier) && specifier.local.name === name) {
                    return true
                }
            }
        }
        if (Variable.is(s)) {
            if (Identifier.is(s.id)) {
                if (s.id.name === name) {
                    return true
                }
            }
            //  TODO: Make this work for ObjectPatterns.
            //  They aren't currently using Declarator's as they should.
        }
    }
    return false
}

// export function getOriginalDeclarator(declarator: Declarator, scopes: NodeMap<ScopeMap>, ancestors: Map<Node, Node>, throwErrors = true): Declarator | null {
//     let parent = ancestors.get(declarator)
//     if (ModuleSpecifier.is(parent)) {
//         let containingModule = getAncestor(parent, ancestors, File.is)!
//         let importDeclaration = ancestors.get(parent) as ImportDeclaration
//         let absoluteSource = getRelative(containingModule.id.name, importDeclaration.source.value as string)
//         //  we cannot just use importDeclaration.source.value  // that may be relative...
//         //  must at least make it absolute first.
//         let sourceModuleDeclaration = scopes.get(declarator)[absoluteSource]
//         if (sourceModuleDeclaration) {
//             if (ImportNamespaceSpecifier.is(parent as any)) {
//                 return sourceModuleDeclaration
//             }
//             let name: string
//             if (ImportSpecifier.is(parent)) {
//                 name = parent.imported.name
//             }
//             else if (ImportDefaultSpecifier.is(parent)) {
//                 name = "default"
//             }
//             else {
//                 throw new Error()
//             }
//             let sourceProgramScope = scopes.get(sourceModuleDeclaration)
//             let sourceDeclarator = sourceProgramScope[name]
//             if (sourceDeclarator == null) {
//                 if (!throwErrors) {
//                     return null
//                 }
//                 throw SemanticError(`${importDeclaration.source.value} does not have export ${name}`, parent)
//             }
//             let sourceDeclaratorParent = ancestors.get(sourceDeclarator)
//             if (!Exportable.is(sourceDeclaratorParent) || !sourceDeclaratorParent.export) {
//                 if (!throwErrors) {
//                     return null
//                 }
//                 console.warn(`${importDeclaration.source.value} ${name} is not exported`)
//                 return null
//                 // throw SemanticError(`${importDeclaration.source.value} ${name} is not exported`, parent)
//             }
//             // recurse in case this exported value is also a reference or re-export
//             // return sourceDeclarator
//             return getOriginalDeclarator(sourceDeclarator, scopes, ancestors)
//         }
//     }
//     // traverse variables that are just constant re-declarations
//     if (Variable.is(parent) && Reference.is(parent.value)) {
//         throw new Error("Need to check if constant");
//         // keep following references to the original
//         // return getDeclarator(parent.value, scopes, ancestors, true, false)
//     }
//     return declarator
// }

// export function getDeclarator(ref: Reference, scopes: NodeMap<ScopeMap>, ancestors: Map<Node, Node>, traverseReferences = false, throwError = true) {
//     let scope = scopes.get(ref)
//     let declarator = scope[ref.name]
//     if (declarator == null) {
//         if (throwError) {
//             throw SemanticError(`${ref.name} declarator not found`, ref)
//         }
//         else {
//             return null
//         }
//     }
//     return traverseReferences ? getOriginalDeclarator(declarator, scopes, ancestors) : declarator
// }

/**
 * Returns an array of self and ancestors where 0 == self and length - 1 = root
 */
export function getAncestorsAndSelfList(node: Node | undefined, ancestorsMap: Map<Node,Node>) {
    let ancestorsList = new Array<Node>()
    while (node != null) {
        ancestorsList.push(node)
        node = ancestorsMap.get(node)
    }
    return ancestorsList
}

export function getAncestor<T>(node: Node, ancestors: Map<Node, Node>, predicate: (a) => a is T): T | null {
    while (node != null) {
        let ancestor = ancestors.get(node)
        if (predicate(ancestor)) {
            return ancestor
        }
        node = ancestor as any
    }
    return null
}

// export function getOriginalDeclaration<T = Declaration>(ref: Reference, scopes: NodeMap<ScopeMap>, ancestors: Map<Node, Node>, predicate: (a) => a is T = Declaration.is as any): T | null {
//     let declarator = getDeclarator(ref, scopes, ancestors, true, false)
//     return declarator != null ? getAncestor<T>(declarator, ancestors, predicate) : null
// }

export function clone(value) {
    if (value == null || typeof value !== "object") {
        return value
    }
    if (value.clone) {
        return value.clone()
    }
    if (value instanceof Set) {
        return new Set(Array.from(value.values()).map(clone))
    }
    if (value instanceof Map) {
        return new Map(Array.from(value.entries()).map(clone))
    }
    if (Array.isArray(value)) {
        return value.map(clone)
    }
    if (Node.is(value)) {
        return new (value.constructor as any)(value)
    }
    let newValues = {}
    for (let name in value) {
        newValues[name] = clone(value[name])
    }
    let copy = new value.constructor(newValues)
    return copy
}

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

export function SemanticError(message: string, ...locations: any[]) {
    let error: any = new Error(message)
    error.locations = locations.map(location => location.location || location)
    return error
}

export function toMap<V>(object: { [name: string]: V }): Map<string,V> {
    let result = new Map<string,V>()
    for (let name in object) {
        result.set(name, object[name])
    }
    return result
}

export function mapValues<K,I,O>(object: Map<K,I>, fn: (I, K) => O): Map<K,O> {
    let result = new Map<K,O>()
    for (let key of object.keys()) {
        let value = object.get(key)
        result.set(key, fn(value, key))
    }
    return result
}

export function getLast<T>(array: any[], predicate: (value) => value is T): T | null {
    for (let i = array.length - 1; i >= 0; i--) {
        let item = array[i]
        if (predicate(item)) {
            return item
        }
    }
    return null
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

export const ionExt = '.ion'

export function getFilesRecursive(directory, pattern?: RegExp, rootDirectory = directory, allFiles = new Array<string>()) {
    for (let name of fs.readdirSync(directory)) {
        let filename = np.join(directory, name)
        let fileInfo = fs.statSync(filename)
        if (fileInfo.isFile()) {
            let relativeFilename = np.relative(rootDirectory, filename)
            if (pattern == null || pattern.test(relativeFilename)) {
                allFiles.push(relativeFilename)
            }
        }
        else {
            getFilesRecursive(filename, pattern, rootDirectory, allFiles)
        }
    }
    return allFiles
}

export function findPackage(dir = process.cwd()) {
    let checkFilename = np.join(dir, "package.json")
    // console.log("check", checkFilename)
    if (fs.existsSync(checkFilename)) {
        return require(checkFilename)
    }
    let newDir = np.dirname(dir)
    if (newDir != dir) {
        return findPackage(newDir)
    }
    return null
}

export function read(file: any) {
    return fs.readFileSync(file, 'utf8')
}

export function getPathFromFilename(namespace: string, filename: string) {
    const separator = "."
    let path = (filename.substring(0, filename.length - ionExt.length).split(/[\/\\]+/g)).join(separator)
    return namespace.length > 0 ? namespace.replace(/[\/\\]/g, separator) + separator + path : path
}

export function getInputFilesRecursive(directory: string | string[], namespace: string, rootDirectory : string | null = null, allFiles: {[path: string]: string} = {}): {[path: string]: string} {
    if (Array.isArray(directory)) {
        for (let dir of directory) {
            getInputFilesRecursive(dir, namespace, dir, allFiles)
        }
    }
    else {
        if (rootDirectory == null)
            rootDirectory = directory
        let files = getFilesRecursive(directory, new RegExp(ionExt + "$"))
        for (let filename of files) {
            let path = getPathFromFilename(namespace, filename)
            allFiles[path] = read(np.join(rootDirectory, filename))
        }
    }
    return allFiles
}

export function exists(file: string) {
    return fs.existsSync(file)
}

export function makeDirectories(dir: string) {
    if (!exists(dir)) {
        // make parent first
        makeDirectories(np.dirname(dir))
        // make self
        fs.mkdirSync(dir)
    }
}

export function write(file: string, content: string, encoding?: string) {
    makeDirectories(np.dirname(file))
    if (content != null) {
        if (encoding === undefined && typeof content === 'string')
            encoding = 'utf8'
        fs.writeFileSync(file, content, { encoding } as any)
    }
    else if (exists(file)) {
        fs.unlinkSync(file)
    }
}
