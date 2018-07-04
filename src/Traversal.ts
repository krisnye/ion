
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
    return object != null && ((object.constructor.types && object.constructor.types.has('ion.ast.Node')) || object.type != null)
}

export const remove = Object.freeze([])
export const skip = Symbol('skip')

export type enter = (node: object, ancestors: object[], string: string[]) => Symbol | void
export type leave = (node: object, ancestors: object[], string: string[]) => object | object[] | void

export type Visitor = { enter?: enter, leave?: leave }

function traverseChildren(container: any, visitor: Visitor, isArray: boolean, ancestors: object[], path: string[]) {
    ancestors.push(container)

    let hasArrays = false
    function traverseChild(name: string, child: any) {
        path.push(name)
        let childResult = traverse(child, visitor, ancestors, path)
        if (childResult !== child && childResult !== undefined && childResult !== remove) {
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
    if (container.constructor === Map) {
        for (let key of container.keys()) {
            let child = container.get(key)
            traverseChild(key, child)
        }
    }
    else {
        for (let name in container) {
            let child = container[name]
            traverseChild(name, child);
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
    let isMap = node.constructor === Map
    let enterResult: any = null
    if (isNode && enter != null)
        enterResult = enter(node, ancestors, path)
    if (enterResult !== skip && (isNode || isArray || isObject || isMap))
        traverseChildren(node, visitor, isArray, ancestors, path)
    //  then call leave on node unless it's an array.
    let result = undefined
    if (isNode && leave != null)
        result = <any>leave(node, ancestors, path)
    return result != null ? result : node
}