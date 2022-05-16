import { CompoundType } from "../ast/CompoundType"
import { IntersectionType } from "../ast/IntersectionType"
import { NumberType, overlaps } from "../ast/NumberType"
import { ObjectType } from "../ast/ObjectType"
import { Type } from "../ast/Type"
import { TypeReference } from "../ast/TypeReference"
import { UnionType } from "../ast/UnionType"
import { VoidType } from "../ast/VoidType"
import { EvaluationContext } from "../EvaluationContext"

/**
 * Returns true if all instances of type 'a' are instances of type 'b'
 * Returns false if all instances of type 'a' are not instances of type 'b'
 * Returns null if some instances of type 'a' could be instances of type 'b'
 */
 export function isSubtype(aa: Type | null, bb: Type | null, c: EvaluationContext): boolean | null {
    if (aa === bb || aa?.toString() === bb?.toString()) {
        return true
    }
    if (bb == null) {
        return true
    }
    if (aa == null) {
        return null
    }
    let a = c.getComparisonType(aa);
    let b = c.getComparisonType(bb);
    if (a instanceof VoidType || b instanceof VoidType) {
        return false;
    }
    if (a instanceof CompoundType) {
        const left = isSubtype(a.left, b, c);
        const right = isSubtype(a.right, b, c);
        if (left === true && right === true) {
            return true;
        }
        if (a instanceof UnionType) {
            if (left === false && right === false) {
                return false;
            }
        }
        else { // a instanceof IntersectionType
            if (left === false || right === false) {
                return false;
            }
        }
        return null;
    }
    if (b instanceof UnionType) {
        return isSubtype(a, b.left, c) || isSubtype(a, b.right, c);
    }
    if (b instanceof IntersectionType) {
        return isSubtype(a, b.left, c) && isSubtype(a, b.right, c);
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
            if (a.integer !== b.integer) {
                return false;
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
    }
    // at this point, we should either be reference types or object types
    if (a instanceof TypeReference && b instanceof TypeReference) {
        if (a.name !== b.name) {
            return null;
        }
        let aTypes = a.typeArguments || [];
        let bTypes = b.typeArguments || [];
        let result: boolean | null = true
        for (let i = 0; i < bTypes.length; i++) {
            let aType = aTypes[i];
            let bType = bTypes[i];
            let subcheck = isSubtype(aType, bType, c);
            if (subcheck === false) {
                result = false;
                break;
            }
            else if (subcheck === null) {
                result = null;
            }
        }
        // different references, different types, no implements yet
        return result;
    }
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
