import CacheMap from "./CacheMap"

export default function memoize(fn: Function): Function {
    let cache = CacheMap()
    return function() {
        let key = arguments.length == 1 && !Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments, 0)
        let result = cache.get(key)
        if (result === undefined) {
            cache.set(key, result = fn.apply(this, arguments))
        }
        return result
    }
}