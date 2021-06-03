
export type Boolean = boolean
export function isBoolean(value): value is boolean {
    return typeof value === "boolean";
}

export default Boolean