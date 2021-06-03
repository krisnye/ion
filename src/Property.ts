import Type from "./Type"

/**
 * Represents a runtime property which is compatible with Object.defineProperty property descriptors.
 * May also contain metadata fields.
 */
export default class Property<T = any> {

    configurable?: boolean
    enumerable?: boolean
    writable?: boolean
    value?: T
    get?: () => T
    set?: (value: T) => void
    type?: Type

    constructor(props) {
        Object.assign(this, props)
    }

    toString() {
    }

}