import getHashcode from "./getHashcode"

export default function equals(a, b): boolean {
    if (a === b) {
        return true
    }
    if (a == null || b == null) {
        return false
    }
    let typeA = typeof a
    let typeB = typeof b
    if (typeA !== typeB) {
        return false
    }
    if (typeA !== "object") {
        return false
    }
    if (a.constructor !== b.constructor) {
        return false
    }
    if (getHashcode(a) !== getHashcode(b)) {
        return false
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false
        }
        for (let i = 0; i < a.length; i++) {
            if (!equals(a[i], b[i])) {
                return false
            }
        }
    }
    else if (a instanceof Set) {
        if (a.size !== b.size) {
            return false
        }
        for (let element of a) {
            if (!b.has(element)) {
                return false
            }
        }
    }
    else if (a instanceof Map) {
        if (a.size !== b.size) {
            return false
        }
        for (let key of a.keys()) {
            if (!b.has(key)) {
                return false
            }
            if (!equals(a.get(key), b.get(key))) {
                return false
            }
        }
    }
    else {
        let countA = 0
        for (let name in a) {
            countA++
            if (!equals(a[name], b[name])) {
                return false
            }
        }
        let countB = 0
        for (let name in b) {
            countB++
        }
        if (countA !== countB) {
            return false
        }
    }
    return true
}