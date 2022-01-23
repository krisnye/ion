
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
    "**": 16,
    "*": 14,
    "/": 14,
    "%": 14,
    "+": 13,
    "-": 13,
    "<<": 12,
    ">>": 12,
    "<": 11,
    "<=": 11,
    ">": 11,
    ">=": 11,
    "==": 10,
    "!=": 10,
    "&": 9,
    "^": 8,
    "|": 7,
    "&&": 6,
    "||": 5,
    ":": 4,
    "=>": 3,
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
