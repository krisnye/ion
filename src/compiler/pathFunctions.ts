
// export const globalNamespace = "$"
const pathSeparator = "."
// export function isAbsolutePath(path: string) {
//     return path.startsWith(globalNamespace);
// }
export function getAbsolutePath(moduleName: string, exportName?: string) {
    let path = moduleName;
    if (exportName != null && exportName != getLastName(moduleName)) {
        path += `${pathSeparator}${exportName}`
    }
    return path
}
export function getLastName(path: string): string {
    return path.slice(path.lastIndexOf(pathSeparator) + 1);
}
export function getParent(path: string): string | null {
    const lastIndex = path.lastIndexOf(pathSeparator);
    if (lastIndex < 0) {
        return null;
    }
    return path.slice(0, lastIndex);
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
export function resolve<T>(path: string, map: Map<string,T>): string | null {
    let steps = split(path);
    while (true) {
        let check = join(...steps);
        let value = map.get(check);
        if (value != null) {
            return check;
        }
        if (steps.length <= 1) {
            return null;
        }
        steps.splice(steps.length - 2, 1);
    }
}