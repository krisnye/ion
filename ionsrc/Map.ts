
export type Map<K,V> = ReadonlyMap<K,V>

export function isMap<K,V>(value, K, V): value is Map<K,V> {
    // need to runtime check this for each key being instance of K and each value being instanceof V
    return value instanceof globalThis.Map
}

export default Map