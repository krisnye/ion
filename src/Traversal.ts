import Location from "./ast/Location"

class Replace {
    readonly items: readonly any[]
    constructor(items: readonly any[]) {
        this.items = items
    }
}

class Pair {
    key
    value
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}

export const skip = Symbol('skip')
export function replace(...items: readonly any[]) {
    return new Replace(items)
}
export function pair(key, value) {
    return new Pair(key, value)
}
export const remove = Object.freeze(new Replace(Object.freeze([])))
export type Enter = (
    node: any,
    ancestors: object[],
    path: string[],
) => Symbol | void
export type Merge<T = any> = (
    node: T,
    changes: Partial<T> & any,
    helper: { patch<T>(container: T, changes: Partial<T> & Object): T },
    ancestors: object[],
    path: string[],
) => object | object[] | void
export type Leave = (
    node: any,
    ancestors: object[],
    path: string[],
) => object | object[] | void
export type Predicate = (node: any) => boolean
export type Visitor = {
    enter?: Enter,
    merge?: Merge,
    leave?: Leave,
    skip?: Predicate,
    filter?: Predicate,
}

const nochanges = Object.freeze({})

interface ContainerHelper<C = any, K = any, V = any> {
    type: string,
    patch(original: C, newValues: Partial<C> & any): C
    keys(container: C): IterableIterator<K>
    getValue(container: C, key: K): V
    // setValue(container: C, key: K, value: V | Replace)
    // normalize(container: C, values): C
}

// key value pairs in the Replace ??? or something else?
//  Array => value
//  Object => Pair(key, value)
//  Map => Pair(key, value)
//  Set => value

const objectContainerHelper: ContainerHelper<Readonly<any>, string, any> = {
    type: "Object",
    patch(original, newValues) {
        let ctor = original.constructor as any
        let iterateValues = { ...original }
        for (let key in newValues) {
            iterateValues[key] = newValues[key]
        }
        let values = {}
        function setValue(name, value) {
            if (value instanceof Pair) {
                values[value.key] = value.value
            }
            else {
                values[name] = value
            }
        }
        for (let name in iterateValues) {
            let value = iterateValues[name]
            if (value instanceof Replace) {
                for (let item of value.items) {
                    setValue(item.key, item.value)
                }
            }
            else {
                setValue(name, value)
            }
        }
        return ctor === Object ? values : new ctor(values)
    },
    *keys(container) {
        for (let key in container) {
            if (!key.startsWith("_")) {
                yield key
            }
        }
    },
    getValue(container, key: string) {
        return container[key]
    },
}

const arrayContainerHelper: ContainerHelper<Readonly<Array<any>>, number, any> = {
    ...objectContainerHelper,
    type: "Array",
    patch(original, newValues) {
        let values = [...original]
        for (let key in newValues) {
            values[key] = newValues[key]
        }
        let newContainer: any[] = []
        for (let value of values) {
            if (value instanceof Replace) {
                for (let item of value.items) {
                    newContainer.push(item)
                }
            }
            else {
                newContainer.push(value)
            }
        }
        return newContainer
    },
    keys(container: any[]) {
        return container.keys()
    },
    getValue(container: any[], key: number) {
        return container[key]
    },
}

const mapContainerHelper: ContainerHelper<ReadonlyMap<any,any>, any, any> = {
    ...objectContainerHelper as any,
    type: "Map",
    patch(original: Map<any,any>, newValues) {
        let iterateMap = new Map<any,any>(original.entries())
        for (let key in newValues) {
            iterateMap.set(key, newValues[key])
        }

        let newMap = new Map<any,any>()
        function setValue(name, value) {
            if (value instanceof Pair) {
                newMap.set(value.key, value.value)
            }
            else {
                newMap.set(name, value)
            }
        }
        for (let name of iterateMap.keys()) {
            let value = iterateMap.get(name)
            if (value instanceof Replace) {
                for (let item of value.items) {
                    setValue(item.key, item.value)
                }
            }
            else {
                setValue(name, value)
            }
        }
        return newMap
    },
    keys(container: ReadonlyMap<any,any>) {
        return container.keys()
    },
    getValue(container: ReadonlyMap<any,any>, key) {
        return container.get(key)
    },
}

function getContainerHelper(node): ContainerHelper | null {
    if (node != null) {
        if (Array.isArray(node)) {
            return arrayContainerHelper
        }
        if (node instanceof Map) {
            return mapContainerHelper
        }
        if (typeof node === "object") {
            return objectContainerHelper
        }
    }
    return null
}

export function getValue(container, key) {
    return getContainerHelper(container)!.getValue(container, key)
}

export function defaultSkip(node) {
    return node instanceof Set || node instanceof Location
}

export function defaultFilter(node) {
    return node != null && typeof node === "object" && !Array.isArray(node) && !(node instanceof Map) && node.constructor !== Object
}

// How do we know to skip some objects like raw objects? without knowing about Node.is?
export function traverseChildren(
    container: Readonly<any>,
    visitor: Visitor,
    ancestors: object[] = [],
    path: any[] = [],
    merge?: Merge,
) {
    const helper = getContainerHelper(container)
    if (helper != null) {
        let changes: any = null

        ancestors.push(container)
        for (let key of helper.keys(container)) {
            path.push(key)
            let child = helper.getValue(container, key)
            let result = traverse(child, visitor, ancestors, path)
            if (result === undefined) {
                result = child
            }
            if (result !== child) {
                if (changes == null) {
                    changes = {}
                }
                changes[key] = result
            }
            path.pop()
        }
        ancestors.pop()

        if (merge != null) {
            let result = merge(container, changes ?? nochanges, helper, ancestors, path)
            if (result === undefined && changes !== nochanges) {
                result = helper.patch(container, changes)
            }
            if (result !== undefined) {
                container = result
            }
        }
        else if (changes != null) {
            container = helper.patch(container, changes)
        }
    }

    return container
}

export function traverse(
    node: Readonly<any>,
    visitor: Visitor,
    ancestors: object[] = [],
    path: string[] = []
): any {
    const {enter, merge, leave, skip: _skip = defaultSkip, filter = defaultFilter} = visitor
    if (node == null || _skip(node)) {
        return node
    }

    const callback = filter(node)

    let enterResult: any = null
    if (callback && enter != null) {
        enterResult = enter(node, ancestors, path)
    }
    if (enterResult !== skip) {
        node = traverseChildren(node, visitor, ancestors, path, callback ? merge : undefined)
    }
    let leaveResult: any = null
    if (callback && leave != null) {
        leaveResult = <any>leave(node, ancestors, path)
    }
    return leaveResult || node
}
