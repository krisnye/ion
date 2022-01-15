
export const prefix: { [op: string]: number | undefined } = {
    "+": 10,
    "-": 10,
    "!": 10,
} as const;

// built in operators
//  () [] {}
//  .
//  =>
//  ->
//  all other operators *could* be defined literally within the source code
