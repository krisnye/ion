
import Type from "./Type";

export default new Type(a => typeof a === "number" && Math.floor(a) === a, "Integer")
