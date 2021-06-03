import is from "../is";
import {is as isSymbol} from "../symbols";

if (Object.fromEntries == null) {
    (Object as any).fromEntries = function(entries) {
        let object = {};
        if (entries != null) {
            for (let [key, value] of entries) {
                object[key] = value
            }
        }
        return object
    };
}

Object[isSymbol] = function(a, keyType?, valueType?) {
    if (a != null && !Array.isArray(a) && typeof a === "object") {
        // maybe check child types if present
        if (keyType || valueType) {
            for (let key in a) {
                if (keyType && !is(key, keyType)) {
                    return false
                }
                let value = a[key]
                if (valueType && !is(value, valueType)) {
                    return false
                }
            }
        }
        return true
    }
    return false
};

Object.defineProperties(Object.prototype, {
    [Symbol.iterator]: {
        *value() {
            for (let name in this) {
                let value = this[name]
                yield [name, value]
            }
        },
        configurable: true,
        writable: true, //  some subclasses in libraries extend this so make sure we allow that
    }
})
