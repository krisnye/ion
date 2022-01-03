import { Type, NumberType, ObjectType, UnionType, IntersectionType, Reference, Property, Identifier, NeverType, ReferenceType } from "../ast";
import toCodeString from "../toCodeString";
import { isNumberSubtype } from "./numberTypes";
import * as baseTypes from "../types";
import EvaluateContext from "./EvaluateContext";

type Maybe = true | false | null
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   true    true
//  false   |  true   false   null
//  null    |  true   null    null
function max(values: Iterable<Maybe>): Maybe {
    let result: Maybe = false
    for (let value of values) {
        if (value === true) {
            return true
        }
        if (value == null) {
            result = null
        }
    }
    return result
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   false   null
//  false   |  false  false   false
//  null    |  null   false   null
function min(values: Iterable<Maybe>): Maybe {
    let result: Maybe = true
    for (let value of values) {
        if (value === false) {
            return false
        }
        if (value == null) {
            result = null
        }
    }
    return result
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   null    null
//  false   |  null   false   null
//  null    |  null   null    null
function same(values: Iterable<Maybe>): Maybe {
    let result: Maybe | undefined = undefined
    for (let value of values) {
        if (result === undefined) {
            result = value
        }
        else if (result !== value) {
            return null
        }
    }
    return result === undefined ? null : result
}

function getBaseType(a: Type) {
    if (NumberType.is(a)) {
        return "Number"
    }
    if (ObjectType.is(a)) {
        return a.kind
    }
    return null
}

function getPropertyType(objectType: ObjectType, propertyKey: Type | Identifier): Type | null {
    if (Identifier.is(propertyKey)) {
        for (let {id, value} of objectType.properties as Array<Property>) {
            if (Identifier.is(id) && propertyKey.name === id.name) {
                return value as Type
            }
        }
    }
    else {
        for (let {id, value} of objectType.properties as Array<Property>) {
            if (Type.is(id) && isSubtype(propertyKey, id)) {
                return value as Type
            }
        }
    }
    return null
}

/**
 * Returns true if all instances of type 'a' are instances of type 'b'
 * Returns false if all instances of type 'b' are not instances of type 'b'
 * Returns null if some instances of type 'a' could be instances of type 'b'
 */
export function isSubtype(a: Type | null, b: Type | null): boolean | null {
    if (a === b || toCodeString(a) === toCodeString(b)) {
        return true
    }
    if (b == null) {
        return true
    }
    if (a == null) {
        return null
    }
    if (NeverType.is(a as any) || NeverType.is(b as any)) {
        return false
    }
    // deal with Intersection and Union types first.
    if (UnionType.is(a)) {
        return same(a.types.map(ai => isSubtype(ai, b)))
    }
    if (UnionType.is(b)) {
        return max(b.types.map(bi => isSubtype(a, bi)))
    }
    if (IntersectionType.is(a)) {
        return max(a.types.map(ai => isSubtype(ai, b)))
    }
    if (IntersectionType.is(b)) {
        return min(b.types.map(bi => isSubtype(a, bi)))
    }
    // number type comparison
    if (NumberType.is(a)) {
        // if right is any number then any numbertype is a subtype
        if (ReferenceType.is(b) && b.name === baseTypes.Number.name) {
            return true
        }
        if (NumberType.is(b)) {
            return isNumberSubtype(a, b)
        }
    }
    // at this point, we should either be reference types or object types
    if (Reference.is(a) && Reference.is(b)) {
        if (a.name !== b.name) {
            return null
        }
        let aTypes = a.typeArguments || []
        let bTypes = b.typeArguments || []
        let result: boolean | null = true
        for (let i = 0; i < bTypes.length; i++) {
            let aType = aTypes[i]
            let bType = bTypes[i]
            let subcheck = isSubtype(aType, bType)
            if (subcheck === false) {
                result = false
                break
            }
            else if (subcheck === null) {
                result = null
            }
        }
        // different references, different types, no implements yet
        return result
    }
    let baseA = getBaseType(a)
    let baseB = getBaseType(b)
    if (baseA != null && baseB != null && baseA != baseB) {
        // different base types are mutually exclusive
        return false
    }
    if (ObjectType.is(a) && ObjectType.is(b)) {
        //  should compare properties and verify that for each type key in a
        //  the value for that key has an instance of same type in b
        for (let {id, value} of b.properties as Array<Property>) {
            let propertyType = getPropertyType(a, id)
            if (propertyType == null || !isSubtype(propertyType, value as Type)) {
                return false
            }
        }
        return true
    }

    return false
    // throw new Error(`Not expecting these types here: a: ${a.constructor.name}, b: ${b.constructor.name}`)
}
