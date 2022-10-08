import { NumberType } from "./ast/NumberType";
import { getAbsolutePath } from "./pathFunctions";

function getCorePath(name: string) {
    return getAbsolutePath(name);
}

export const coreTypes = {
    Array: getCorePath("Array"),
    Number: getCorePath("Number"),
    Integer: getCorePath("Integer"),
    String: getCorePath("String"),
    RegExp: getCorePath("RegExp"),
    Native: getCorePath("@Native"),
    UnitTest: getCorePath("@UnitTest"),
    Type: getCorePath("Type"),
    Any: getCorePath("Any"),
    Infer: getCorePath("Infer"),
    Null: getCorePath("Null"),
    Void: getCorePath("Void"),
    Undefined: getCorePath("Undefined"),
}

export const Native_javascript = "javascript";
