
export type Array<T> = ReadonlyArray<T>

export function isArray<T>(value): value is Array<T> {
    return Array.isArray(value);
}

export default Array