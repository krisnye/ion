import parsing from "./parsing"

const defaultPhases = [
    parsing,
]

export default defaultPhases

// we remove the last 6 phases if we're not emitting.
export const noEmit = defaultPhases.slice(0, -1);
