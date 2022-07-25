
export const globalNamespace = "$"
const pathSeparator = ".";
// export function isAbsolutePath(path: string) {
//     return path.startsWith(globalNamespace);
// }
export function getAbsolutePath(moduleName: string, exportName: string = getLastName(moduleName)) {
    let path = moduleName;
    if (exportName != null && exportName != getLastName(moduleName)) {
        path += `${pathSeparator}${exportName}`
    }
    return path;
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

export function *getResolvePaths(path: string) {
    let steps = split(path);
    while (steps.length > 0) {
        yield join(...steps);
        steps.splice(steps.length - 2, 1);
    }
}

//  will successively test to find a path that exists
//  for instance, for path foo.bar.baz
//  will test "foo.bar.baz", "foo.baz", "baz"
export function resolve<T>(path: string, map: Map<string,T>): string | null {
    for (let check of getResolvePaths(path)) {
        let value = map.get(check);
        if (value != null) {
            return check;
        }
    }
    return null;
}