
export type String = string

export function isString(value): value is string {
    return typeof value === "string";
}

export default String