## Format

Type
    ->      Intermediate Representation
    =>      Dot Expression Representation

## Types

Vector
    ->      TypeReference(Vector)
    =>      . is Vector

Foo & Bar
    ->      IntersectionType(TypeReference(Foo), TypeReference(Bar))
    =>      . is Foo && . is Bar

Foo | Bar
    ->      UnionType(TypeReference(Foo), TypeReference(Bar))
    =>      . is Foo || . is Bar

0 .. 1
    ->      NumberType(min = 0, max = 1)
    =>      . >= 0 && . <= 1

( x: 0 .. 1, y: 0 .. 1 )
    ->      ObjectType()
                [Identifier(x), NumberType(min = 0, max = 1)]
                [Identifier(y), NumberType(min = 0, max = 1)]
    =>      .x >= 0 && .x <= 1 && .y >= 0 && .y <= 1

Vector( x: > 0, y: > 0 )
    ->      IntersectionType()
                TypeReference(Vector)
                ObjectType()
                        [Identifier(x), NumberType(min: 0)]
                        [Identifier(y), NumberType(min: 0)]
    =>      . is Vector && .x >= 0 && .x <= 1 && .y >= 0 && .y <= 1
