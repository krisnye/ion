
# Map
    Map<K,V>
    { K: V }
    { Number: String, String: Number }
# Array
    Array<Type>
    Number[]
    [0..<length: Type]
    [0..3: Number, 4..5: String]
    [Number, Number, String, length: 3]
# Number
    Number
    Integer
    12      //  NumberType  >= 12 .. <= 12
    > 0     //  NumberType
    < 10
    0 .. 10
    > 0 .. < 10
    0.0 .. 1.0

    //  what unit is this? You cannot tell by looking at it.
    > pi
    //  if we're not sure, we should assume Number.
    //  if we want Integer then we should specify it thusly.
    Integer & > pi
# Anonymous Class
    (key:String,value:Number)
# Class
    Point & Vector & (length: > 0)
    Vector(length: > 0 .. <10)
    Vector(a.b.c: > 10)
# Predicate Type
    (value: Integer) -> value % 2 == 0
    (value: Integer) -> !Odd(value)
# Function Type
    (name: String) : Number
# Intersection Type
    Foo & Bar & (length: > 0)

# Ast Representations

    //  The AST Representation ought to mirror how programmers think about a type.
    //  That will make error messages more useful.
    //  We can convert to other formats for analysis as needed.

    Type
    |-> ReferenceType : Reference, Type
    |-> NumberType { precision, min, max, minExclusive, maxExclusive }
    |-> ObjectType { type: "Map" | "Array" | "Object", properties: Property[] }
    |-> IntersectionType { types: Type[] }
    |-> UnionType { types: Type[] }
