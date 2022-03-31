
export const globalNamespace = "$"
const pathSeparator = "."
export function isAbsolutePath(path: string) {
    return path.startsWith(globalNamespace);
}
export function getAbsolutePath(moduleName: string, exportName?: string) {
    let path = isAbsolutePath(moduleName) ? moduleName : `${globalNamespace}.${moduleName}`
    if (exportName != null && exportName != getLastName(moduleName)) {
        path += `${pathSeparator}${exportName}`
    }
    return path
}
export function getLastName(path: string): string {
    return path.slice(path.lastIndexOf(pathSeparator) + 1);
}
export function getParent(path: string): string | null {
    if (path == globalNamespace) {
        return null
    }
    return path.slice(0, path.lastIndexOf(pathSeparator));
}

export function split(path: string) {
    return path.split(pathSeparator)
}

export function join(...steps: string[]) {
    return steps.join(pathSeparator)
}

//  will successively test to find a path that exists
//  for instance, for path foo.bar.baz
//  will test "foo.bar.baz", "foo.baz", "baz"
export function resolve<T>(path: string, map: Map<string,T>): [string,T] | null {
    let steps = split(path)
    while (true) {
        let check = join(...steps)
        let value = map.get(check)
        if (value != null) {
            return [check,value]
        }
        if (steps.length <= 1) {
            return null
        }
        steps.splice(steps.length - 2, 1)
    }
}