
import is from "../is";
import { is as isSymbol } from "../symbols"

function isTypedArray(value) {
    return value != null && value.buffer instanceof ArrayBuffer && value.byteLength > 0
}

Array[isSymbol] = function(a, itemType?) {
    if (Array.isArray(a)) {
        // maybe check child types if present
        if (itemType) {
            for (let item of a) {
                if (!is(item, itemType)) {
                    return false
                }
            }
        }
        return true
    }
    return isTypedArray(a);
};