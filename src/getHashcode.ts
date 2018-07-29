
let nextInitial = 133
let nextFactor = 31
let initialSymbol = Symbol("hashcodeInitial")
let factorSymbol = Symbol("hashcodeFactor")
let hashSymbol = Symbol("hashcode")
function getNextInitial() {
    let value = nextInitial
    nextInitial += 2
    return value
}
function getNextFactor() {
    let value = nextFactor
    nextFactor += 2
    return value
}
function getFactor(fn: Function) {
    let factor = fn[factorSymbol]
    if (factor == null) {
        factor = fn[factorSymbol] = getNextFactor()
    }
    return factor
}
function getInitial(fn: Function) {
    let initial = fn[initialSymbol]
    if (initial == null) {
        initial = fn[initialSymbol] = getNextInitial()
    }
    return initial
}

const stringInitial = -3534235
const stringFactor = getNextFactor()
const hashLookup = new WeakMap<any,number>()

// function to keep hashcodes to 32 bit integers
let arrayBuffer = new ArrayBuffer(8)
let floatBuffer = new Float64Array(arrayBuffer)
let integerBuffer = new Uint32Array(arrayBuffer)
function truncate(value: number) {
    floatBuffer[0] = value
    let upper = integerBuffer[0]
    let lower = integerBuffer[1]
    return upper ^ lower
}

export default function getHashcode(value): number {
    if (value === null) {
        return 100000000002
    }
    if (value === undefined) {
        return 100000000003
    }
    let type = typeof value
    if (type === "number") {
        return truncate(79345 + value * 203548799)
    }
    else if (type === "boolean") {
        return value ? 111111111111 : 100000000001
    }
    let hash = value[hashSymbol]
    if (hash == null) {
        hash = hashLookup.get(value)
    }
    if (hash == null) {
        if (type === "string") {
            hash = stringInitial
            for (let i = 0; i < value.length; i++) {
                hash = truncate(hash * stringFactor + value.codePointAt(i))
            }
        }
        else {
            if (type === "function") {
                let initial = value[initialSymbol] = getNextInitial()
                let factor = value[factorSymbol] = getNextFactor()
                hash = truncate(9999 * initial + factor)
            }
            else // type == "object"
            {
                let ctor = value.constructor
                let factor = getFactor(ctor)
                hash = getInitial(ctor)
                // now iterate over all the elements
                if (Array.isArray(value)) {
                    hash = truncate(hash * factor + value.length)
                    for (let i = 0; i < value.length; i++) {
                        hash = truncate(hash * factor + getHashcode(value[i]))
                    }
                }
                else if (value instanceof Set) {
                    //  order of values in a Set/Map/Object currently matters, it shouldn't
                    //  either we should sort here or sort during construction
                    for (let element of value) {
                        hash = truncate(hash * factor + getHashcode(element))
                    }
                }
                else if (value instanceof Map) {
                    for (let key of value) {
                        hash = truncate(hash * factor + getHashcode(key))
                        hash = truncate(hash * factor + getHashcode(value.get(key)))
                    }
                }
                else {
                    let count = 0
                    for (let name in value) {
                        count++
                        hash = truncate(hash * factor + getHashcode(name))
                        hash = truncate(hash * factor + getHashcode(value[name]))
                    }
                    hash = truncate(hash * factor + count)
                }
            }
            if (Object.isFrozen(value)) {
                //  cache the hash in a weakmap
                hashLookup.set(value, hash)
            }
            else {
                // cache the hash on the object
                value[hashSymbol] = hash
            }
        }
    }
    return hash
}