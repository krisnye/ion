
Thinking of internally only having functions, no operations.
Multi functions?

    // File: math
    class Vector
        x: Number
        y: Number
    add(a: Number, b: Number) => a + b
    add(a: Vector, b: Number) => Vector(a.x + b, a.y + b)
    add(a: Number, b: Vector) => add(b, a)

Ast

    $math.Vector = class Vector
        x: $Number
        y: $Number
    $math.add = MultiFunction
        (a: $Number, b: $Number) => a + b
        (a: $math.Vector, b: $Number) => $math.Vector(a.x + b, a.y + b)
        (a: $Number, b: $math.Vector) => add(b, a)

Irt

    Map
        path: Class | Function | ObjectExpression | ArrayExpression | Number | Integer | Call
