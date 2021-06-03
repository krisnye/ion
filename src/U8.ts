import Integer from "./Integer";
import Type from "./Type";

export default new Type(
    (value) => Integer.is(value) && value <= 255 && value >= 0,
    "U8",
)
