import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 127 && value >= -128,
    "I8",
)
