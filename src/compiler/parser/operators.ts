
export const prefixPrecedence: { [op: string]: number | undefined } = {
    "+": 10,
    "-": 10,
    "!": 10,
} as const;

export const infixPrecedence: { [op: string]: number | undefined } = {
    "+": 12,
    "-": 12,
    "*": 13,
    "/": 13,
    "%": 13,
    "**": 14,

    "<": 10,
    "<=": 10,
    ">": 10,
    ">=": 10,
    "==": 10,
    "!=": 10,
    "|": 10,
    "||": 10,
    "&": 10,
    "&&": 10,
} as const;

export const infixRightAssociative: { [op: string]: boolean | undefined } = {
    "=": true,
    "**": true,
} as const;

// built in operators
//  () [] {}
//  .
//  =>
//  ->
//  all other operators *could* be defined literally within the source code
