//  abstract
                        Node
                        Statement   // Any node which can live on a line by itself
                        Expression: Statement
                        //  if it could be an expression or statement it extends expression
                        //  and we'll check at runtime if it actually is or isnt
                        Typed{Type: Expression}

//  File                File: Block
x                       Reference{name: String}: Expression
x: Number = 10          Variable{id: Declarator, type: Expression, value: Expression}: Statement
x := 20                 Assignment{id: Id, value: Expression}: Statement
x + b                   Operation{operator: String, operands: Node[]}: Expression
class Vector2           Class{id: Declarator}: Statement
    x: Number           VD
    y: Number           VD
    translate(dx: Number, dy: Number) -> this{x: x + dx, y: y + dy}
                        Function{id?: Identifier, parameters: Variable[], body: Statement[]}: Block
if x                    If{test: Expression, consequent: Expression, alternate: Expression}: Expression
    y                   Block{body: Statement[]}: Expression, Scope
else
    x
for item in array       For{left: Pattern, right: Expression, body: Statement[]}: Statement
    x
foo(1, option: 3) ->    Call{callee:Expression, arguments: Property[]}: Expression
option: 3               Property{name: Expression, value: Expression}
