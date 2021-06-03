import Type from "./Type"

function toTypeCheck(values) {
    // if it's flags, it's OK.
    let allNumbers = true
    let set = new Set()
    for (let value of Object.values(values)) {
        if (typeof value !== "number") {
            allNumbers = false
            break
        }
    }

    if (allNumbers) {
        return (value) => typeof value === "number"
    }

    return (value) => {
        return set.has(value)
    }
}

export default class Enum extends Type {

    readonly values: { [name: string]: any }

    constructor(name, values) {
        super(toTypeCheck(values), name)
        Object.assign(this, values)
        this.values = values
    }

    getValue(name) {
        return this.values[name]
    }

    getName(value) {
        for (let [k, v] of this.values as any) {
            if (v === value) {
                return k
            }
        }
        return null
    }

}