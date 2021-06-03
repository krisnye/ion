import Type, { ReadValue, WriteValue } from "./Type";

const ValueType = new Type(
    value => Type.is(value) && value.size && value.read && value.write,
    "ValueType"
)

type TSValueType = Type & { size: number, read: ReadValue, write: WriteValue }

export default class TypedArray<T> {

    /** The size of the type in quads */
    readonly stride: number
    readonly type: TSValueType
    readonly floatData: Float32Array
    readonly uintData: Uint32Array
    readonly length: number

    constructor(type: TSValueType, length: number)
    constructor(type: TSValueType, data: ArrayBuffer)
    constructor(type: TSValueType, dataOrLength: ArrayBuffer | number) {
        if (!ValueType.is(type)) {
            throw new Error(`Type is not a value type: ${type}`)
        }
        this.stride = type.size
        let data = typeof dataOrLength === "number" ? new ArrayBuffer(this.stride * dataOrLength) : dataOrLength
        this.type = type
        this.length = data.byteLength / (4 * this.stride)
        this.floatData = new Float32Array(data)
        this.uintData = new Uint32Array(data)
    }

    *[Symbol.iterator]() {
        let { stride, length } = this;
        let end = stride * length;
        for (let offset = 0; offset < end; offset += stride) {
            yield this.type.read(this.floatData, this.uintData, offset);
        }
    }

    get<T>(index: number): T {
        let offset = this.stride * index
        return this.type.read(this.floatData, this.uintData, offset)
    }

    set<T>(index: number, value: T) {
        let offset = this.stride * index
        return this.type.write(this.floatData, this.uintData, offset, value)
    }

}