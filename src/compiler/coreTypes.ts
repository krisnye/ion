import { getAbsolutePath } from "./pathFunctions";

export const coreTypes = {
    Array: getAbsolutePath("Array"),
    Float: getAbsolutePath("Float"),
    Integer: getAbsolutePath("Integer"),
    String: getAbsolutePath("String"),
    MultiFunction: getAbsolutePath("@MultiFunction"),
    Native: getAbsolutePath("@Native"),
}