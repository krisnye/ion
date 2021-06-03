import Type from "./Type";

export default new Type(
    (value) => typeof value === "number",
    "F64",
)
