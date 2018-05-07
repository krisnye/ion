import { traverse, remove, skip, Visitor } from "../Traversal"
import toposort from "../toposort"
import * as c from "../common"
import * as ast from "../IonAst"
import { CanonicalReference } from "../IonAst";
import { ClassBody } from "../JsAstTypes";
import { fail } from "assert";

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
const _IrtRoot_RemoveDeadDeclarations = (n: ast.IrtRoot) => {
    function hasPublicDependent(id:string) {
        // let debug = id.indexOf('Foo') >= 0 ? (...args: any[]) => console.log(...args) : (...args: any[]) => { return }
        if (isPublicId(id))
            return true
        let dependents = dependencies[id]
        // debug(id, dependents)
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

const __MemberExpression_simplifyCanonicalReferences = (n: ast.MemberExpression, ancestors: object[], path: string[]) => {
    if (n.object instanceof CanonicalReference && n.property instanceof ast.Id) {
        return new ast.CanonicalReference(n.object.id + '.' + n.property)
    }
}

const ClassDeclaration_VariableDeclaration_checkMetaReferences = (n: ast.ClassDeclaration) => {
    for (let property of n.meta) {
        if (property.key instanceof CanonicalReference) {
            // let id = property.key
        }
        else {
            property.throwSemanticError('Meta properties must be canonical references')
        }
    }
}

export const passes = [
    [CanonicalReference_RemoveIndirection],
    [__MemberExpression_simplifyCanonicalReferences],
    [CanonicalReference_AddDependencies, _IrtRoot_RemoveDeadDeclarations],
    [ClassDeclaration_VariableDeclaration_checkMetaReferences]
]
