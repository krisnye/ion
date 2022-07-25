import { getAbsolutePath } from "./pathFunctions";

export const coreTypes = {
    Array: getAbsolutePath("Array"),
    Number: getAbsolutePath("Number"),
    Integer: getAbsolutePath("Integer"),
    String: getAbsolutePath("String"),
    Native: getAbsolutePath("@Native"),
    Type: getAbsolutePath("Type"),
    Any: getAbsolutePath("Any"),
    Infer: getAbsolutePath("Infer"),
    Null: getAbsolutePath("Null"),
    Void: getAbsolutePath("Void"),
    Undefined: getAbsolutePath("Undefined"),
}

export const Native_javascript = "javascript";
