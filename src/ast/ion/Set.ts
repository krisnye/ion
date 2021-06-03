
export type Set<V> = ReadonlySet<V>

export function isSet<V>(value): value is Set<V> {
    return value instanceof globalThis.Set;
}

export default Set