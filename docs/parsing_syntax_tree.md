BinaryOperation
    op: Id
    left
    right

UnaryOperation
    op: Id
    value

Conditional
    if: Id
    test
    then?: Id
    consequent
    else?: Id
    alternate

Class
    id
    extends

Call
    callee
    args