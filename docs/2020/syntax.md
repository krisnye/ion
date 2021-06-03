
# [X] inline function signature

    let add = (a: Number = 0, b: Number = 0): Number => a + b
    let add = (a = 0, b = 0) => a + b
    let add = (a, b) => a + b

# [X] inline/outline function signature

    let add = (a = 0, b = 0) =>
        if a < 0
            a + b
        else
            a - b

# [ ] outline function signature

    let add =
        ()
            a = 0
            b = 0
        =>
            a + b

# [X] outline if else

    if expression
        consequent

    if expression
        consequent
    else
        alternate

    if expression
        consequent
    else if expression
        alternate
    else
        default

# Inline conditional chain
    a is Point && a.x > 0 && b is Point && b.y < 0

# Converted to nested if statements which will allow us to insert new type assertions
    if a is Point
        (let a: Point) # VariableDeclaration & virtual == true
        if a.x > 0
            (let a: Point & a.x > 0)
            if b is Point
                (let b: Point)
                if b.y < 0
                    (let b: Point & b.y < 0)
                    true
    false
