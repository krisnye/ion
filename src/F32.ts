import Type from "./Type";

export default new Type(
    (value) => typeof value === "number",
    "F32",
    1,
    (f, u, i) => f[i],
    (f, u, i, value: number) => f[i] = value
)
