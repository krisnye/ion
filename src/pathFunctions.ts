import { setupMaster } from "cluster"

// absolute path related functions

const ROOT_CHARACTER = "/"
const PATH_SEPARATOR = "/"
const ROOT_REGEX = new RegExp(ROOT_CHARACTER, "g")
// const PATH_REGEX = new RegExp(PATH_SEPARATOR, "g")

export function join(...steps: Array<string | null | undefined>) {
    let b: string[] = []
    for (let step of steps) {
        if (step) {
            if (b.length > 0 && b[b.length - 1] != ROOT_CHARACTER) {
                b.push(PATH_SEPARATOR)
            }
            if (step.startsWith(ROOT_CHARACTER)) {
                b.length = 0
            }
            b.push(step)
        }
    }
    return b.join("")
}

export function sanitize(name: string) {
    return name.replace(ROOT_REGEX, '.') //.replace(PATH_REGEX, '.')
}

export function isParent(parent: string, child: string) {
    if (child === parent || !child.startsWith(parent)) {
        return false
    }
    let remainder = parent.length > 0 ? child.slice(parent.length + 1) : child
    return remainder.indexOf(PATH_SEPARATOR) < 0
}

export function split(path: string) {
    return path.split(PATH_SEPARATOR)
}

export function getParent(path: string): string | null {
    if (path.length === 1) {
        return null
    }
    let lastName = getLastName(path)
    let remainder = path.slice(0, path.length - lastName.length)
    if (remainder.length > 1 && remainder[remainder.length - 1] === PATH_SEPARATOR) {
        remainder = remainder.slice(0, -1)
    }
    return remainder
}

export function getRelative(from: string, to: string) {
    return join(getParent(from), to)
}

export function getUniqueClientName(name: string) {
    return "::" + name.slice(1)
}

export function absolute(...steps: Array<string | null | undefined>) {
    let path = join(...steps)
    if (!isAbsolute(path)) {
        path = ROOT_CHARACTER + path
    }
    if (path[1] === PATH_SEPARATOR) {
        //  this happens if we concatenate with root for some reason.
        path = ROOT_CHARACTER + path.slice(2)
    }
    // a Type export with same name as module also shares the same path (the Type export IS the module)
    let parent = getParent(path)
    if (parent && getLastName(parent) === getLastName(path)) {
        return parent
    }
    return path
}

export function isAbsolute(path: string) {
    return path != null && path[0] === ROOT_CHARACTER
}

export function getLastName(path: string) {
    let name = path.slice(path.lastIndexOf(PATH_SEPARATOR) + 1)
    if (isAbsolute(name)) {
        name = name.slice(1)
    }
    return name
}