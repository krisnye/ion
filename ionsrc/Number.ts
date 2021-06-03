
export type Number = number

export function isNumber(value): value is Number {
    return typeof value === "number";
}

export default Number