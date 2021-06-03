
type Patch<T> = T | null | {
    [P in keyof T]?: Patch<T[P]>
}

export default Patch

