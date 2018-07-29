import CacheMap from "./CacheMap"

let cache = CacheMap()

export function clear() {
    cache.clear()
}

export default function intern<T>(value: T): T {
    let internedValue = cache.get(value)
    if (internedValue === undefined) {
        internedValue = value
        cache.set(value, value)
    }
    return internedValue
}