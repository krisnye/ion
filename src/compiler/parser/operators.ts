
export const prefixPrecedence: { [op: string]: number | undefined } = {
    "(": 19,
    "+": 14,
    "-": 14,
    "!": 14,
    "~": 14,
    "void": 2,
} as const;

export const prefixAmbiguous: { [op: string]: boolean | undefined } = {
    "-": true,
};

export const infixPrecedence: { [op: string]: number | undefined } = {
    "[": 18,    //  ]
    ".": 18,
    "(": 18,    //  )
    "**": 16,
    "*": 15,
    "/": 15,
    "%": 15,
    "+": 14,
    "-": 14,
    "<<": 13,
    ">>": 13,
    "<": 12,
    "<=": 12,
    ">": 12,
    ">=": 12,
    "==": 11,
    "!=": 11,
    "&": 10,
    "^": 9,
    "|": 8,
    "&&": 7,
    "||": 6,
    ":": 5,
    "=>": 4,
    "=": 3,
    "+=": 3,
    "-=": 3,
    "**=": 3,
    "*=": 3,
    "/=": 3,
    "%=": 3,
    "<<=": 3,
    ">>=": 3,
    "^=": 3,
    "&=": 3,
    "|=": 3,
    "&&=": 3,
    "||=": 3,
    ",": 1,
} as const;

export const infixRightAssociative: { [op: string]: boolean | undefined } = {
    "=": true,
    "**": true,
} as const;
