import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 65535 && value >= 0,
    "U16"
)
