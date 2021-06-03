import { is } from "./symbols"

export type ReadValue = (f: Float32Array, u: Uint32Array, index: number) => any
export type WriteValue = (f: Float32Array, u: Uint32Array, index: number, value) => void

export default class Type {

    is: (a) => boolean
    name: string
    // fields for primitive types
    size?: number
    read?: ReadValue
    write?: WriteValue
    coerce?: Function

    constructor(is: (a) => boolean, name?: string)
    constructor(is: (a) => boolean, name: string, size: number, read: ReadValue, write: WriteValue)
    constructor(
        is: (a) => boolean,
        name?: string,
        size?: number,
        read?: ReadValue,
        write?: WriteValue,
    ) {
        this.is = is
        if (name == null) {
            name = is.name
            if (name == null) {
                name = ""
            }
            if (name.startsWith("is")) {
                name = name.slice(2)
            }
        }
        this.name = name
        this.size = size
        this.read = read
        this.write = write
    }

    toString() {
        return name
    }

    static is(instance) {
        return instance != null && typeof (instance.is ?? instance[is]) === "function"
    }

}