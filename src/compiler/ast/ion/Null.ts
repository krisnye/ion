
export type Null = null

export function isNull(value): value is Null {
    return value == null;
}

export default Null