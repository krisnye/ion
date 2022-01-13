## Source, Parsed

    //  test.ion
    x = 1
    for i in 1 .. 10
        x := x * 2
    x

## Static Single Assignment Form
Assignments go away in this form, only new Variables are used.

    x1 = 1
    x2 = x1 + 1
    x2 + x2

## Evaluate just the body
Since each variable name is unique we can store values in a flat Map.

    //  first two lines set variables
    variables = Map()
        "x1" -> Integer({ value: 1 })
        "x2" -> Integer({ value: 2 })
    //  final call convert references to values
    Call()
        callee: ... Multi-Function from import
        arguments: []
            Integer({ value: 2 })
            Integer({ value: 2 })
    //  the correct implementation with Native js code can be pulled from source.
    Integer({ value: 4 })
