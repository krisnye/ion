import { traverse, remove, skip, Visitor } from "../Traversal"
import toposort from "../toposort"
import * as c from "../common"
import * as ast from "../IonAst"

const Node_NoOp = () => skip

const CanonicalReference_RemoveIndirection = (n: ast.CanonicalReference, ancestors: object[]) => {
    let root = <ast.IrtRoot>ancestors[0]
    function getId(node: ast.CanonicalReference): string {
        let id = node.id
        let value = root.values[id]
        if (value instanceof ast.CanonicalReference)
            return getId(value)
        return id
    }
    n.id = getId(n)
}

const isPublicId = (id:string) => id.indexOf('$') < 0
const dependencies: {[id:string]:{[id:string]:true}} = {}
const CanonicalReference_AddDependencies = (n: ast.CanonicalReference, ancestors: object[], path: string[]) => {
    let baseId = path[1] // ['values', 'id', ...]
    let thisId = n.id
    if (baseId !== thisId) {
        if (dependencies[thisId] == null)
            dependencies[thisId] = {}
        dependencies[thisId][baseId] = true
    }
}
const IrtRoot_RemoveDeadDeclarations = (n: ast.IrtRoot) => {
    function hasPublicDependent(id:string) {
        if (isPublicId(id))
            return true
        let dependents = dependencies[id]
        if (dependents != null) {
            for (let depId in dependents) {
                if (hasPublicDependent(depId))
                    return true
            }
        }
        return false
    }

    for (let id in n.values) {
        if (!isPublicId(id) && !hasPublicDependent(id)) {
            delete n.values[id]
        }
    }
}

export const passes = [
    [CanonicalReference_RemoveIndirection],
    [CanonicalReference_AddDependencies],
    [IrtRoot_RemoveDeadDeclarations]
]
