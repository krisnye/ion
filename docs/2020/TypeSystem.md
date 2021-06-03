
Type System Grammar

    Range = Integer ('..' Integer?)? / '..' Integer 
    Quantifier = '*' / '+' / '?' / Range
    KeyType = Type
    ValueType = Type
    KeyValue = (KeyType ':')? ValueType Quantifier?
    Map = '[' (KeyValue (',' KeyValue)*)? ']'

Type System Examples

                            Ion 2                                   Canonical                                   TypeScript
Array                       [Vector*]                               [Integer:Vector]                            Vector[]
Tuple                       [Vector,Integer,String]                 [0:Vector,1:Integer,2:String]               [Vector,number,string]
Map                         [Vector:Number]                                                                     Map<Vector,number>
Named Tuple                 ['x':Integer,'y':Integer]                                                           {x: number, y: number}
Regex                       ['A'+,'B'?,'C'*,'D']                    [0:'A',length-1:'D',1..:'A'|'B'|'C']        /^A+B?C*D$/
Bidirectional Map           [Integer:String,String:Integer]                                                     Map<number|string,number|string>
Class Instance              ["name":String,"age":Integer]                                                       {name:string,age:number}
Fixed Length Array          [Number 8]                              [Integer:Vector,"length":8]                 number[]
Family Modelled as Array    [Mother, Father, Child*]                [0:Mother,1:Father,2..:Child]               (Mother|Father|Child)[]

Type System Semantics

    Everything can be modelled as a Map.
    A Map contains zero or more ordered key value type pairs.
    To check if a Map contains a member with type T:
        for each key value pair [K, V]
            if T is a subtype of type K
                then that member exists with type V
                return
            if K is a subtype of type T
                then that member is a union of this type and any others found in this loop
        that member is not a valid member of the type

    Example

    Tuple from above is represented as
        Map
            0: Vector
            1: Integer
            2: String

    let tuple: [Vector,Integer,String] = [Vector(12,20), 45, "Foo"]
    let tuple0 = tuple[0] # Vector
    let tuple1 = tuple[1] # Integer
    let tuple2 = tuple[2] # String
    let tuple3 = tuple[3] # Type Error
    let someRandomNumber: 0...1
    let tuple0or1 = tuple[someRandomNumber] # Vector | Integer

Type System AST

SimpleTypes
    Reference -> Number, Boolean, String
ComplexTypes
    []
    Array
    Map
    Set
    Object

AstType
    properties: PropertyType[]

FieldMap: Array<[Type,Type]>

structure PropertyType
    var key: Type
    var value: Type

Reference -> to Type or Class
