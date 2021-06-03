import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 147483647 && value >= -2147483648,
    "I32",
)
