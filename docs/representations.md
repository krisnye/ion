# Representations

## Interpreter Instances

    { "": "path.to.Type", ...values }

If we can interpret values then ast types for value types would be redundant.

## Ast Types that could be used by Interpreter

- IntegerLiteral
- FloatLiteral
- StringLiteral
- ObjectLiteral
- ArrayLiteral
- Reference -> has to be handled especially

Which Ast Types do need to exist?

- Class
- For
- Conditional
- Variable
- Assignment
- Block
- Call
- Return
- Function ? This also has runtime implications?
