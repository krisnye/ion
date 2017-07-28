
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

// export function traverseWithPath(
//     root:any,

//     enter:null | ((node:any, path: any[]) => any),
//     leave:null | ((node:any, path: any[]) => any) = null
// ) {
//     let path: any[] = []
//     traverse(
//         root,
//         function(node:any) {
//             let result
//             path.push(node)
//             if (enter != null)
//                 result = enter(node, path)
//             return result
//         },
//         function(node:any) {
//             let result
//             if (leave != null)
//                 result = leave(node, path)
//             path.pop()
//             return result
//         }
//     )

// }

export const skip = Symbol("Traversal.skip")
export const remove = Object.freeze([])

export type Visitor = {
    enter?: (node:object) => Symbol | void,
    leave?: (node:object) => object | object[] | void
}

export function traverse(
    node:any,
    visitor: Visitor
): any {
    let {enter, leave} = visitor

    let isArray = Array.isArray(node)
    let isNode = isObjectNode(node)
    let hasArrays = false

    let skipChildren = isNode && enter != null && enter(node) === skip
    if (!skipChildren) {
        //  traverse children first
        for (let name in node) {
            if (name[0] !== '_') {
                let child = node[name]
                if (isArray || isNode) {
                    let childResult = traverse(child, visitor)
                    if (childResult !== child && childResult !== undefined) {
                        if (Array.isArray(childResult))
                            hasArrays = true
                        node[name] = childResult
                    }
                }
            }
        }

        //  now flatten current array if needed
        if (isArray && hasArrays) {
            let flattened = flatten(node)
            node.splice(0, node.length, ...flattened)
        }
    }

    //  then call leave on node unless it's an array.
    let result = undefined
    if (isNode && leave != null)
        result = leave(node)

    return result != null ? result : node
}