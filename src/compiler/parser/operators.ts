
export const prefixPrecedence: { [op: string]: number | undefined } = {
    "(": 19,
    "+": 14,
    "-": 14,
    "!": 14,
    "~": 14,
    "<": 14,    //  used for numeric types: < 10
    "<=": 14,   //  used for numeric types: <= 10
    ">": 14,    //  used for numeric types: > 10
    ">=": 14,   //  used for numeric types: >= 10
    "!=": 14,   //  used for numeric types: != 10
    "void": 2,
} as const;

export const prefixAmbiguous: { [op: string]: boolean | undefined } = {
    "-": true,
};

export function getInfixPrecedence(op: string) {
    let precedence = infixPrecedence[op];
    return precedence != null ? precedence : op.endsWith("=") ? 3 : 15;
}

export const infixAllowOutline: { [op: string]: true | undefined } = {
    "=>": true,
}

export const overridable = {
    "**": true,
    "*": true,
    "/": true,
    "%": true,
    "+": true,
    "-": true,
    "<<": true,
    ">>": true,
    "&": true,
    "^": true,
    "|": true,
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
    "<": 12,    //  not overridable
    "<=": 12,   //  not overridable
    ">": 12,    //  not overridable
    ">=": 12,   //  not overridable
    "==": 11,   //  not overridable
    "!=": 11,   //  not overridable
    "..": 11,   //  not overridable
    "&": 10,
    "^": 9,
    "|": 8,
    "&&": 7,    //  not overridable
    "||": 6,    //  not overridable
    ":": 5,     //  not overridable
    "=>": 4,    //  not overridable
    "=": 3,     //  not overridable
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
