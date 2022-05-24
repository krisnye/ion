Use Types or Dot Expressions for type analysis?

Types
+ More concise
+ Numeric operations like * easier to verify.
+ Can compare ObjectType properties.
- Harder to represent arbitrary expressions like (. % 2) == 0

Dot Expressions
+ More semantically comprehensible
+ More generally useful beyond just type analysis
+ Ability to represent any expression
- How do we represent numeric ranges?

Options

Use Types for operator result calculations?
Use Dot Expressions for isConsequent comparisons?
Add DotType as a Type with obvious conversion to Dot Expression?

Retain system as is, maybe add DotTypes.

In order to improve reporting of which type caused an issue:
    - Type.toDotExpression should also map expressions back to source type.
    - isConsequent should also report back on which sub expression pairs cause true, null, false. Maybe an optional callback.
    - Probably extend EvaluationContext with optional callback and map.
