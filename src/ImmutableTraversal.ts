const { ast } = require("./ion")
import Patch from "./Patch"
import Splice from "./Splice"

function isObjectNode(object: any) {
    return ast.Node.is(object)
}

export const remove = Object.freeze([])
export const skip = Symbol('skip')

export type enter = (node: any, ancestors: object[], path: any[])
    => Symbol   //  Symbol('skip) to stop traversing any children.
    | void      //  do nothing
export type leave = (node: any, ancestors: object[], path: any[])
    => Patch    //  Patch to apply to the current node
    | any[]     //  array to splice into the current parent array replacing current element
    | object    //  object to replace this node with
    | null      //  null value to replace this node with
    | void      //  do nothing

export type Visitor = { enter?: enter, leave?: leave }

function traverseChildren(container: any, visitor: Visitor, isArray: boolean, ancestors: object[], path: any[]) : Patch | any[] {
    ancestors.push(container)

    let result: Patch | any[] = Patch.empty

    function traverseChild(name: string | number, child: any) {
        path.push(name)
        let childResult = traverse(child, visitor, ancestors, path)
        path.pop()
        return childResult
    }

    if (isArray) {
        let splices: Splice[] | null = null
        for (let index = 0; index < container.length; index++) {
            let child = container[index]
            let result = traverseChild(index, child);
            if (result === undefined || result === child)
                continue
            if (splices == null)
                splices = []
            if (!Array.isArray(result))
                result = [result]
            splices.push(new Splice(index, result, 1))
        }
        if (splices != null) {
            result = Splice.apply(container, ...splices)
        }
    }
    else {
        let changes: Map<any,any> | null = null
        function addChange(key, value) {
            if (value === undefined)
                return
            if (changes == null)
                changes = new Map()
            changes.set(key, value)
        }
        if (container.constructor === Map) {
            for (let key of container.keys()) {
                let child = container.get(key)
                let result = traverseChild(key, child)
                addChange(key, result)
            }
        }
        else {
            for (let key in container) {
                let child = container[key]
                let result = traverseChild(key, child);
                addChange(key, result)
            }
        }
        if (changes) {
            result = new Patch(changes)
        }
    }

    ancestors.pop()

    return result
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
    let result: any = undefined
    let childPatch = Patch.empty
    if (enterResult !== skip && (isNode || isArray || isObject || isMap)) {
        let childResult = traverseChildren(node, visitor, isArray, ancestors, path)
        if (Array.isArray(childResult)) {
            result = childResult
        }
        else {
            childPatch = childResult
        }
    }
    //  then call leave on node unless it's an array.
    if (isNode && leave != null) {
        //  if childPatch, we apply that before leaving the node
        if (childPatch) {
            node = Patch.apply(node, childPatch)
        }
        result = <any>leave(node, ancestors, path)
        if (Patch.is(result)) {
            result = Patch.apply(node, result)
        }
    }

    return result != null ? result : node
}