
x                       Reference(name: String): Expression
x: Type                 Variable(id, type)
x: Number = 10          Variable(id, type, value)
x = 10                  Variable(id, value)

(x = 1, y = 2)          ObjectExpression(kind = "Object")
[1, 2]                  ObjectExpression(kind = "Array")
{ 1 -> 2, 2 -> 1}       ObjectExpression(kind = "Map")

x + b                   BinaryOperation(operator: String, left, right): Expression
x := 20                 BinaryOperation(operator: ":=", left, right): Statement
class Vector2           Class(id: Declarator): Statement
    x: Number           Variable
    y: Number           Variable
    translate(dx: Number, dy: Number) -> this{x = x + dx, y = y + dy}
                        Function(id?, parameters: Variable[]): Block
if x                    Conditional(test, consequent, alternate)
    y                   Block(body: Statement[]): Expression, Scope
else
    x
for item in array       For(left: Expression, right: Expression, body: Block)
    x
(x: Number, y: Number) =>   FunctionExpression
foo(1, option = 3)      Call(callee:Expression, arguments: Property[]): Expression
