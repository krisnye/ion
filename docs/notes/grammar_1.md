
Number

Expression = |
    Number
    Mapping
    Variable
    ( Expression )

Variable = |
    Id = Expression
    Id : Type = Expression

Mapping = |
    E -> E
    Map

Map = |
    { Mapping* }
    Object
    Array

Object = |
    ( Variable* )

Array = |
    [ Expression* ]
