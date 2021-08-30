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
[e] = 20                Property{key, value}
x := 20                 Assignment{id: Id, value: Expression}: Statement
x + b                   Operation{operator: String, operands: Node[]}: Expression
class Vector2           Class{id: Declarator}: Statement
    x: Number           VD
    y: Number           VD
    translate(dx: Number, dy: Number) -> this{x: x + dx, y: y + dy}
                        Function{id?, parameters: Variable[]}: Block
if x                    Conditional{ test, consequent, alternate }
    y                   Block{body: Statement[]}: Expression, Scope
else
    x
for item in array       For{left: Pattern, right: Expression}: Block
    x
foo(1, option: 3) ->    Call{callee:Expression, arguments: Property[]}: Expression
option: 3               Property{name: Expression, value: Expression}
{ a: 1 }                ObjectExpression: Block
{ a, b } = value        ObjectPattern: Block
[a, b, c]               ArrayExpression: Block
