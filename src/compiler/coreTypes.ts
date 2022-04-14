import { getAbsolutePath } from "./pathFunctions";

export const coreTypes = {
    Array: getAbsolutePath("Array"),
    Number: getAbsolutePath("Number"),  //  not a runtime type but used during compilation
    Float: getAbsolutePath("Float"),
    Integer: getAbsolutePath("Integer"),
    String: getAbsolutePath("String"),
    MultiFunction: getAbsolutePath("@MultiFunction"),
    Native: getAbsolutePath("@Native"),
}