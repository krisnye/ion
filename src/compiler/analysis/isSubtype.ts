import { AnyType } from "../ast/AnyType"
import { IntersectionType } from "../ast/IntersectionType"
import { NumberType, overlaps } from "../ast/NumberType"
import { ObjectType } from "../ast/ObjectType"
import { Type } from "../ast/Type"
import { UnionType } from "../ast/UnionType"
// import { VoidType } from "../ast/VoidType"
import { EvaluationContext } from "../EvaluationContext"

type Maybe = true | false | null
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   true    true
//  false   |  true   false   null
//  null    |  true   null    null
function max(a: Maybe, b: Maybe): Maybe {
    if (a === true || b === true)
        return true
    if (a == null || b == null)
        return null
    return false
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   false    true
//  false   |  false   false   false
//  null    |  true   false    null
function maxNoFalse(a: Maybe, b: Maybe): Maybe {
    if (a === false || b === false)
        return false
    if (a === true || b === true)
        return true
    return null
}

//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   false   null
//  false   |  false  false   false
//  null    |  null   false   null
function min(a: Maybe, b: Maybe): Maybe {
    if (a === false || b === false)
        return false
    if (a == null || b == null)
        return null
    return true
}
//  a  \  b |  true   false   null
//  --------------------------------
//  true    |  true   null    null
//  false   |  null   false   null
//  null    |  null   null    null
function same(a: Maybe, b: Maybe): Maybe {
    return a === b ? a : null
}

/**
 * Returns true if all instances of type 'a' are instances of type 'b'
 * Returns false if all instances of type 'a' are not instances of type 'b'
 * Returns null if some instances of type 'a' could be instances of type 'b'
 */
 export function isSubtype(a: Type | null, b: Type | null, c: EvaluationContext): boolean | null {
    if (a === b || a?.toString() === b?.toString() || b == null || a instanceof AnyType) {
        return true
    }
    if (a == null) {
        return null
    }
    a = c.getComparisonType(a);
    b = c.getComparisonType(b);
    // if (a instanceof VoidType || b instanceof VoidType) {
    //     return false;
    // }
    if (a instanceof UnionType) {
        return same(isSubtype(a.left, b, c), isSubtype(a.right, b, c))
    }
    if (b instanceof IntersectionType) {
        return min(isSubtype(a, b.left, c), isSubtype(a, b.right, c))
    }
    if (b instanceof UnionType) {
        return max(isSubtype(a, b.left, c), isSubtype(a, b.right, c))
    }
    if (a instanceof IntersectionType) {
        return maxNoFalse(isSubtype(a.left, b, c), isSubtype(a.right, b, c))
    }

    let baseA = a.getBasicTypes(c);
    let baseB = b.getBasicTypes(c);
    if ((baseA & baseB) === 0) {
        // different base types are mutually exclusive
        return false
    }

    // number type comparison
    if (a instanceof NumberType) {
        if (b instanceof NumberType) {
            if (b.step && !a.step) {
                // TODO: check that steps actually match.
                return null;
            }
            if ((b.min == null || overlaps(a.min, b.min, a.minExclusive < b.minExclusive) === true) &&
                (b.max == null || overlaps(b.max, a.max, a.maxExclusive < b.maxExclusive) === true)
            ) {
                return true
            }
            if (overlaps(a.max, b.min, b.minExclusive || a.maxExclusive) === false || overlaps(b.max, a.min, a.minExclusive || b.maxExclusive) === false) {
                return false
            }
        }
        return null;
    }
    // // at this point, we should either be reference types or object types
    // if (a instanceof TypeReference && b instanceof TypeReference) {
    //     if (a.name !== b.name) {
    //         return null;
    //     }
    //     let aTypes = a.typeArguments || [];
    //     let bTypes = b.typeArguments || [];
    //     let result: boolean | null = true
    //     for (let i = 0; i < bTypes.length; i++) {
    //         let aType = aTypes[i];
    //         let bType = bTypes[i];
    //         let subcheck = isSubtype(aType, bType, c);
    //         if (subcheck === false) {
    //             result = false;
    //             break;
    //         }
    //         else if (subcheck === null) {
    //             result = null;
    //         }
    //     }
    //     // different references, different types, no implements yet
    //     return result;
    // }
    if (a instanceof ObjectType && b instanceof ObjectType) {
        let allTrue = true;
        for (let { key: bKey, value: bType } of b.properties) {
            let aType = a.getPropertyType(bKey, c);
            if (aType == null) {
                return null;
            }
            let subResult = isSubtype(aType, bType, c);
            if (subResult === false) {
                return false;
            }
            if (subResult === null) {
                allTrue = false;
            }
        }
        if (allTrue) {
            return true;
        }
    }
    return null
}
