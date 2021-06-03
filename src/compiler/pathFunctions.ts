import Null from "../Null"
import Undefined from "../Undefined"
import Type from "../Type"
import Property from "../Property"
import Integer from "../Integer"
import Any from "../Any"
import U8 from "../U8"
import U16 from "../U16"
import U32 from "../U32"
import I8 from "../I8"
import I16 from "../I16"
import I32 from "../I32"
import F32 from "../F32"
import F64 from "../F64"
// // absolute path related functions
// import np from "path"

import { Identifier, Location, MemberExpression, Reference } from "./ast"
import { runtimeModuleName } from "./common"

// const ROOT_CHARACTER = ":"
const PATH_SEPARATOR = "/"
// const EXPORT_SEPARATOR = "#"
// const DEFAULT_EXPORT = "default"
const ROOT = ""

const ionGlobals = new Set([
    Undefined.name,
    Null.name,
    Type.name,
    Property.name,
    Integer.name,
    Any.name,
    U8.name,
    U16.name,
    U32.name,
    I8.name,
    I16.name,
    I32.name,
    F32.name,
    F64.name,
])

const globalPrefix = "global:"
export function getGlobalReference(node: Reference) {
    let { location } = node
    // check if name is exported by ionscript runtime, 
    if (ionGlobals.has(node.name)) {
        return new MemberExpression({
            object: new Reference({ location, name: runtimeModuleName }),
            property: new Identifier({ location, name: node.name }),
        })
    }
    return node.patch({ path: getGlobalPath(node.name) })
}
export function getGlobalPath(name: string) {
    //  check first and see if this name is exported by our runtime module
    //  if so, we import it from there.
    return `${globalPrefix}${name}`
}
export function isGlobalPath(path: string) {
    return path.startsWith(globalPrefix)
}

export function getModulePath(moduleName: string, name: string, location?: Location) {
    if (location) {
        return `${moduleName}#${location.start.line}:${location.start.column}:${name}`
    }
    else {
        return `${moduleName}#${name}`
    }
}

// //  path format is
// //  path/to/module#export
// //  url/to/module.js
// //  path/to/module#default => default export
// //  path/to/module => same as * export

function isRelative(path: string) {
    return path.startsWith(".")
}

function isAbsolute(path: string) {
    return !isRelative(path)
}

function getParent(path: string) {
    let steps = split(path)
    if (steps.length <= 1) {
        return ROOT
    }
    return join(...steps.slice(0, -1))
}

function split(path: string) {
    return path.split(PATH_SEPARATOR)
}

function join(...steps: string[]) {
    return steps.filter(s => s).join(PATH_SEPARATOR)
}

export function getRelative(from: string, to: string) {
    if (isAbsolute(to)) {
        return to
    }

    let steps = split(to)
    from = getParent(from)
    while (from && steps[0]?.startsWith(".")) {
        if (steps[0] === "..") { // if it's just "." then we already got parent above
            from = getParent(from)
        }
        steps.shift()
    }
    return join(from, ...steps)
}