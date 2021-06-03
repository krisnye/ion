import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 32767 && value >= -32768,
    "I16",
)
