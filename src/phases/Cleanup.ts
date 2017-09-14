import * as escodegen from "escodegen"
import * as iot from "../IonAstTypes"
import {fail} from "./Input"
import {remove} from "../Traversal"

const idChars = new Set("_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
const validId = /^[_a-zA-Z][_a-zA-Z0-9]*$/
const encodeLiteralIdentifier = (name: string) => {
    let result = ['__id_']
    for (let c of name) {
        if (idChars.has(c)) {
            result.push(c)
        } else {
            result.push('_', c.charCodeAt(0).toString())
        }
    }
    result.push('_')
    return result.join('')
}
const Identifier_EnsureValidName = (node:any) => {
    if (!validId.test(node.name)) {
        node.name = encodeLiteralIdentifier(node.name)
    }
}

const __UnionType_IntersectionType_ConstrainedType_LiteralType_FunctionType_Remove = (node:any) => {
    return remove
}

export const passes = [
    [Identifier_EnsureValidName]
    ,[__UnionType_IntersectionType_ConstrainedType_LiteralType_FunctionType_Remove]
]
