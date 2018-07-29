import equals from "./equals"
import getHashcode from "./getHashcode";

export default function compare(a, b): number {
    if (equals(a, b)) {
        return 0
    }
    if (a === undefined) {
        return 1
    }
    if (b === undefined) {
        return -1
    }
    if (a === null) {
        return 1
    }
    if (b === null) {
        return -1
    }

    let typeA = typeof a
    let typeB = typeof b
    if (typeA !== typeB) {
        return typeA < typeB ? -1 : 1
    }
    if (typeA !== "object") {
        return a < b ? -1 : 1
    }
    if (a.constructor !== b.constructor) {
        return a.constructor < b.constructor ? -1 : 1
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return Math.sign(a.length - b.length)
        }
        for (let i = 0; i < a.length; i++) {
            let c = compare(a[i], b[i])
            if (c !== 0) {
                return c
            }
        }
    }
    else if (a instanceof Set) {
        if (a.size !== b.size) {
            return Math.sign(a.size - b.size)
        }
        let ai = a.values()
        let bi = b.values()
        while (true) {
            let aa = ai.next()
            let bb = bi.next()
            let c = compare(aa.value, bb.value)
            if (c !== 0) {
                return c
            }
            if (aa.done || b.done) {
                throw new Error("Sets should have been equal")
            }
        }
    }
    else if (a instanceof Map) {
        if (a.size !== b.size) {
            return Math.sign(a.size - b.size)
        }
        let ai = a.keys()
        let bi = b.keys()
        while (true) {
            let aa = ai.next()
            let bb = bi.next()
            let c = compare(aa.value, bb.value)
            if (c !== 0) {
                return c
            }
            c = compare(a.get(aa.value), b.get(bb.value))
            if (c !== 0) {
                return c
            }
            if (aa.done) {
                throw new Error(`Maps should have been equal: ${JSON.stringify(Array.from(a))} -> ${JSON.stringify(Array.from(b))}`)
            }
        }
    }
    else {
        let akeys = Object.keys(a)
        let bkeys = Object.keys(b)
        let c = compare(akeys, bkeys)
        if (c !== 0) {
            return c
        }
        for (let name of akeys) {
            c = compare(a[name], b[name])
            if (c !== 0) {
                return c
            }
        }
        throw new Error(`Objects should have been equal`)
    }

    throw new Error("unreachable")
}