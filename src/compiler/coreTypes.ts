import { getAbsolutePath } from "./pathFunctions";

export const coreTypes = {
    Array: getAbsolutePath("Array"),
    Number: getAbsolutePath("Number"),
    Integer: getAbsolutePath("Integer"),
    String: getAbsolutePath("String"),
    MultiFunction: getAbsolutePath("@MultiFunction"),
    Native: getAbsolutePath("@Native"),
    Type: getAbsolutePath("@Type"),
    Any: getAbsolutePath("Any"),
    Infer: getAbsolutePath("Infer"),
}