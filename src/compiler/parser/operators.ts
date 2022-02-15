
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

export function getInfixPrecedence(op: string) {
    let precedence = infixPrecedence[op];
    return precedence != null ? precedence : op.endsWith("=") ? 3 : 15;
}

export const infixPrecedence: { [op: string]: number | undefined } = {
    "[": 19,    //  ]
    ".": 19,
    "(": 19,    //  )
    "**": 17,
    "*": 16,
    "/": 16,
    "%": 16,
    //  default unknown operator precedence
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
    ":=": 3,
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
