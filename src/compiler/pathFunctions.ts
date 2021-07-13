
export const globalNamespace = "global"
const pathSeparator = "."
const globalPrefix = globalNamespace + pathSeparator
export function getGlobalPath(name: string) {
    return `${globalPrefix}${name}`
}
export function isGlobalPath(path: string) {
    return path.startsWith(globalPrefix)
}
export function getLast(path: string): string {
    let lastDot = path.lastIndexOf(pathSeparator)
    return lastDot < 0 ? path : path.slice(lastDot + 1)
}
export function getParent(path: string): string | null {
    if (path == globalNamespace) {
        return null
    }
    let steps = split(path)
    if (steps.length <= 1) {
        return globalNamespace
    }
    return join(...steps.slice(0, -1))
}

export function split(path: string) {
    return path.split(pathSeparator)
}

export function join(...steps: string[]) {
    return steps.join(pathSeparator)
}

// will successively test to find a path that exists
//  for instance, for path foo.bar.baz
//  will test "foo.bar.baz", "foo.baz", "baz"
export function resolve<T>(path: string, map: Map<string,T>): T | null {
    let steps = split(path)
    while (true) {
        let check = join(...steps)
        let value = map.get(check)
        if (value != null) {
            return value
        }
        if (steps.length <= 1) {
            return null
        }
        steps.splice(steps.length - 2, 1)
    }
}