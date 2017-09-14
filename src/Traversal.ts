
function flatten(array: any[]) {
    return array.reduce(
        (a:any,b:any) => {
            if (Array.isArray(b))
                a.splice(a.length, 0, ...b)
            else
                a.push(b)
            return a
        },
        []
    )
}

function isObjectNode(object:any) {
    return object != null && typeof object.type === 'string'
}

export const remove = Object.freeze([])

export type Visitor = {
    enter?: (node:object, ancestors: object[], string: string[]) => Symbol | void,
    leave?: (node:object, ancestors: object[], string: string[]) => object | object[] | void
}

function traverseChildren(container: any, visitor: Visitor, isArray: boolean, ancestors: object[], path: string[]) {
    ancestors.push(container)

    let hasArrays = false
    for (let name in container) {
        if (name[0] !== '_') {
            path.push(name)
            let child = container[name]
            let childResult = traverse(child, visitor, ancestors, path)
            if (childResult !== child && childResult !== undefined) {
                let isChildArray = Array.isArray(childResult)
                if (isChildArray) {
                    if (!isArray) {
                        if (childResult.length > 0)
                            throw new Error("Cannot return array with length > 0 unless container is array")
                        else
                            childResult = undefined
                    }
                    else {
                        hasArrays = true
                    }
                }
                container[name] = childResult
            }
            path.pop()
        }
    }
    ancestors.pop()
    //  now flatten current array if needed
    if (hasArrays)
        container = flatten(container)
}

export function traverse(
    node:any,
    visitor: Visitor,
    ancestors: object[] = [],
    path: string[] = []
): any {
    if (node == null)
        return node

    let {enter, leave} = visitor
    let isObject = typeof node === 'object' // && node != null // implied
    let isNode = isObjectNode(node)
    let isArray = Array.isArray(node)
    if (isNode && enter != null)
        enter(node, ancestors, path)
    if (isNode || isArray || isObject)
        traverseChildren(node, visitor, isArray, ancestors, path)
    //  then call leave on node unless it's an array.
    let result = undefined
    if (isNode && leave != null)
        result = leave(node, ancestors, path)
    return result != null ? result : node
}