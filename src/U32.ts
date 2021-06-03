import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 4294967295 && value >= 0,
    "U32",
    1,
    (f, u, i) => u[i],
    (f, u, i, value: number) => u[i] = value
)
