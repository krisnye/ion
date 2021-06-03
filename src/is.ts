import * as symbols from "./symbols"

export default function is(instance, type, ...templateArgs) {
    //  if the type has an is function we call it
    if (type != null) {
        if (instance != null && instance.constructor.implements instanceof Set) {
            if (instance.constructor.implements.has(type)) {
                return true
            }
        }
        if (type[symbols.is]) {
            return type[symbols.is](instance, ...templateArgs)
        }
        if (typeof type.is === "function") {
            return type.is(instance, ...templateArgs)
        }
        if (typeof type === "function") {
            return instance instanceof type
        }
    }
    return instance === type
}