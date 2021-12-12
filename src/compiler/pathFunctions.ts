
export const globalNamespace = "$"
const pathSeparator = "."
const globalPrefix = globalNamespace
const exportSeparator = "."
const defaultExportName = "export"
export function getAbsolutePath(name: string, exportName?: string) {
    let path = `${globalNamespace}${name}`
    if (exportName != null) {
        path += `${pathSeparator}${exportName}`
    }
    return path
}
function removeGlobalNamespace(name: string) {
    return name.startsWith("$") ? name.slice(1) : name
}
export function isAbsolutePath(path: string) {
    return path.startsWith(globalPrefix)
}
export function getExport(path: string): string | null {
    let exportIndex = path.lastIndexOf(exportSeparator)
    return exportIndex >= 0 ? path.slice(exportIndex + 1) : null
}
export function getLastName(path: string): string {
    path = removeGlobalNamespace(path)
    let exportName = getExport(path)
    if (exportName != null) {
        if (exportName !== defaultExportName) {
            return exportName
        }
        path = path.slice(0, path.length - exportName.length - 1)
    }
    let lastDot = path.lastIndexOf(pathSeparator)
    return lastDot < 0 ? path : path.slice(lastDot + 1)
}
export function getParent(path: string): string | null {
    if (path == globalNamespace) {
        return null
    }
    path = removeGlobalNamespace(path)
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