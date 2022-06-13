import * as fs from "fs";
import * as np from "path";
import { Node } from "./Node";
import { SourceLocation } from "./SourceLocation";

const validIdRegex = /^[@a-z_][@a-z0-9_]*$/i
export function isValidId(name: string) {
    return validIdRegex.test(name)
}

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

export function clone(value, recursive = false) {
    if (value == null || typeof value !== "object") {
        return value
    }
    if (value.clone) {
        return value.clone()
    }
    if (value instanceof Set) {
        return new Set(Array.from(value.values()).map(n => clone(n, recursive)))
    }
    if (value instanceof Map) {
        return new Map(Array.from(value.entries()).map(n => clone(n, recursive)))
    }
    if (Array.isArray(value)) {
        return value.map(n => clone(n, recursive))
    }
    let newValues = {}
    for (let name in value) {
        newValues[name] = clone(value[name], recursive)
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
    for (let e of a) {
        result.add(e)
    }
    for (let e of b) {
        result.add(e)
    }
    return result
}

export function intersection(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (b.has(e)) {
            result.add(e)
        }
    }
    return result
}

export function difference(a: Set<any>, b: Set<any>) {
    let result = new Set<any>()
    for (let e of a) {
        if (!b.has(e)) {
            result.add(e)
        }
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

export function getInputFilesRecursive(directory: string | string[], namespace: string = "", rootDirectory : string | null = null, allFiles: {[path: string]: string} = {}): {[path: string]: string} {
    if (Array.isArray(directory)) {
        for (let dir of directory) {
            getInputFilesRecursive(dir, namespace, dir, allFiles)
        }
    }
    else {
        if (rootDirectory == null) {
            rootDirectory = directory
        }
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
        if (encoding === undefined && typeof content === 'string') {
            encoding = 'utf8'
        }
        fs.writeFileSync(file, content, { encoding } as any)
    }
    else if (exists(file)) {
        fs.unlinkSync(file)
    }
}
