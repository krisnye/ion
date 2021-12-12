//  abstract
                        Node
                        Statement   // Any node which can live on a line by itself
                        Expression: Statement
                        Pattern

//  File                File: Block
x                       Reference{name: String}: Expression
x: Type                 Variable{id, type}
x: Number = 10          Variable{id, type, value}: Statement
x = 10                  Variable{id, value}
//  Destructuring
(x, y) = (x = 1, y = 2)
[a, b] = [1, 2]
{1 -> x, 2 -> y} = { 1 -> 2, 2 -> 1}
e -> 20                 Property{key, value}

x := 20                 Assignment{id: Id, value: Expression}: Statement
x + b                   Operation{operator: String, operands: Node[]}: Expression
class Vector2           Class{id: Declarator}: Statement
    x: Number           VariableDeclaration
    y: Number           VariableDeclaration
    translate(dx: Number, dy: Number) -> this{x: x + dx, y: y + dy}
                        Function{id?, parameters: Variable[]}: Block
if x                    Conditional{ test, consequent, alternate }
    y                   Block{ body: Statement[] }: Expression, Scope
else
    x
for item in array       For{left: Pattern, right: Expression}: Block
    x
(x: Number, y: Number) =>   FunctionExpression
foo(1, option: 3)       Call{callee:Expression, arguments: Property[]}: Expression
option: 3               Property{name: Expression, value: Expression}
{ a -> 1 }              ObjectExpression: Block
{ a, b } = value        ObjectPattern: Block
[a, b, c]               ArrayExpression: Block

# Declarations

    - Variable (Parameter)
    - ClassDeclaration -> Could also just be a Variable.

## Incremental Compilation Technique?

Forget about incremental compilation?