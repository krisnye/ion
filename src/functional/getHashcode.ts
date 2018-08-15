
import sort from "./sort"

//  some inspiration borrowed from: https://github.com/apache/commons-lang/blob/master/src/main/java/org/apache/commons/lang3/builder/HashCodeBuilder.java
//  apparently much of that came from a book on java which contained a section on writing good hashcodes

let nextInitial = 1337653339
let nextFactor = 31
let initialSymbol = Symbol("hashcodeInitial")
let factorSymbol = Symbol("hashcodeFactor")
//  export hashSymbol for testing purposes
export let hashSymbol = Symbol("hashcode")
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
const factorLookup = new WeakMap<any,number>()
function getFactor(fn: Function) {
    let factor = factorLookup.get(fn)
    if (factor == null) {
        factorLookup.set(fn, factor = getNextFactor())
    }
    return factor
}
const initialLookup = new WeakMap<any,number>()
function getInitial(fn: Function) {
    let initial = initialLookup.get(fn)
    if (initial == null) {
        initialLookup.set(fn, initial = getNextInitial())
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

//  gets a key suitable for caching values related to the value
//  for primitives we use itself, for objects we use getHashCode
export function getHashKey(value): null | undefined | number | string | boolean | Function {
    return (value == null || typeof value !== "object") ? value : getHashCode(value)
}

export function getCompositeHashCode(initial, factor, ...values) {
    let hash = initial
    for (let value of values) {
        hash =  truncate(hash * factor + getHashCode(value))
    }
    return hash
}

//  gets a deterministic but not guaranteed to be unique integer number
//  that can be used as a cache key or combined to make a compound code
export default function getHashCode(value): number {
    if (value === null) {
        return 100000000002
    }
    if (value === undefined) {
        return 100000000003
    }
    if (typeof value.getHashCode === "function") {
        return value.getHashCode()
    }
    let type = typeof value
    if (type === "number") {
        return value
    }
    else if (type === "boolean") {
        return value ? 111111111111 : 100000000001
    }
    let hash = hashLookup.get(value) || null
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
                        hash = truncate(hash * factor + getHashCode(value[i]))
                    }
                }
                else if (value instanceof Set) {
                    //  order of values in a Set/Map/Object currently matters, it shouldn't
                    //  either we should sort here or sort during construction
                    for (let element of sort(value)) {
                        hash = truncate(hash * factor + getHashCode(element))
                    }
                }
                else if (value instanceof Map) {
                    for (let key of sort(value.keys())) {
                        hash = truncate(hash * factor + getHashCode(key))
                        hash = truncate(hash * factor + getHashCode(value.get(key)))
                    }
                }
                else if (ctor === Object) {
                    //  raw Object means we must sort the keys and check them and the values
                    let count = 0
                    for (let propertyName of sort(Object.keys(value))) {
                        count++
                        let propertyValue = value[propertyName]
                        if (typeof propertyValue !== "function") {
                            hash = truncate(hash * factor + getHashCode(propertyName))
                            hash = truncate(hash * factor + getHashCode(propertyValue))
                        }
                    }
                    hash = truncate(hash * factor + count)
                }
                else {
                    //  custom object means Ion Model where we know all fields are initialized and in same order
                    //  so we skip counting or hashing names
                    for (let name in value) {
                        hash = truncate(hash * factor + getHashCode(value[name]))
                    }
                }
            }
            //  cache the hash in a weakmap
            hashLookup.set(value, hash)
        }
    }
    return hash
}