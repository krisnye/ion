
export const prefixPrecedence: { [op: string]: number | undefined } = {
    "(": 19,
    "+": 14,
    "-": 14,
    "!": 14,
    "~": 14,
    "void": 1,
} as const;

export const infixPrecedence: { [op: string]: number | undefined } = {
    "[": 18,    //  ]
    ".": 18,
    "(": 18,    //  )
    "**": 15,
    "*": 13,
    "/": 13,
    "%": 13,
    "+": 12,
    "-": 12,
    "<<": 11,
    ">>": 11,
    "<": 10,
    "<=": 10,
    ">": 10,
    ">=": 10,
    "==": 9,
    "!=": 9,
    "&": 8,
    "^": 7,
    "|": 6,
    "&&": 5,
    "||": 4,
    "=": 2,
    "+=": 2,
    "-=": 2,
    "**=": 2,
    "*=": 2,
    "/=": 2,
    "%=": 2,
    "<<=": 2,
    ">>=": 2,
    "^=": 2,
    "&=": 2,
    "|=": 2,
    "&&=": 2,
    "||=": 2,
    ",": 1,
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
