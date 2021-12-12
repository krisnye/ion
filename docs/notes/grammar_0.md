# Expressions

## Number

1
1.5
10e-12

## Map

{}
{ 1 -> 2, 2 -> 3 }
{}
    1 -> 2
    2 -> 3

## Object   (Map of Identifiers to Values)

()
(x = 1, y = 2)
()
    x = 1
    y = 2

## Array    (Map of Indexes to Values)

[]
[1, 2]
[]
    1
    2

## Mapping

E1 -> E2  //  type = typeof E1 -> typeof E2

## Variable

Id = Expression         //  type = typeof Expression
Id: Type = Expression   //  type = Type

## Block

// indent
    E1
    E2
    E3

## Function

()
    x: Number = 1
    y: Number = 2
->
    if x < y
        x
    else
        y

## Conditional

if test
    consequent
else
    alternate

## Loop

for left in right
    block
