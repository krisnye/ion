## Map
Map<K,V>
    {a = 1, b = 2, c = 3}
    {a, b, c}
### Map Loop
for key [, value [, index]] in map
## Array
Array<V>
[a, b, c]
[]
    a
    b
    c
### List Loop
for value [, index] in map
## Class Instance
Vector(x = 1, y = 2)
Vector()
    x = 1
    y = 2
## Named Tuple / Anonymous Class Instance / Namespace
Can only have named fields. All fields are exported.
(x = 1, y = 2)
()
    @foo = 12
    x = 10
    y = 20
    foo() -> 1
    bar() -> 2
