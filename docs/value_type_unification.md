
## Number Values

    1
    1.0

## Number Types

    > 1
    < 10
    == 1
    > 1 .. < 10

## Object Values

    ( x = 1, y = 2 )

### Object Types

    ( x: Number, y: Number )

### Map Values

    { 1 -> 2, 3 -> 4 }

### Map Types

    { K : V }

## Array Values

    [1, 2]

### Array Types

    [ 0 .. 10 : Number ]

## Function Values

    (a: A, b: B) => a + b

## Function Types

    (A, B) : C
    (A, B, optional: Number = 10) : C

## Function Value with Type

    (a: A, b: B): C => a + b

//  function
(a: A, b: B) => a + b

//  function type? Can tell the difference?
//  can a function type actually just be a regular function that operates on types?
(A, B) => C

