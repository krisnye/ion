import is from "./is"
import Type from "./Type"

export default class UnionType {

    types: Type[]
    name: string

    constructor(...types: Type[]) {
        this.types = types
        this.name = types.map(type => type.name).join("|")
    }

    is(value) {
        for (let type of this.types) {
            if (is(value, type)) {
                return true
            }
        }
        return false
    }

    coerce(value) {
        for (let type of this.types) {
            if (type.coerce) {
                value = type.coerce(value)
                if (is(value, type)) {
                    break
                }
            }
        }
        return value
    }

    toString() {
        return name
    }

}