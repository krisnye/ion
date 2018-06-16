
limitations on 'let' variables:
    a 'let' variable should only be composed of variables which can NOT be modified from within the let variables scope.

    var x = 10
    let y = x * 2
    x := 20
    // this is confusing because now y = 20 when x * 2 implies y should be 40

    type Whole = Integer{ value > 0 and value < 10 }
    this = special keyword for class instance
    value < 10 and value > 100

    CONSTRAINTS
    Number < 10 and > 20
    Vector .x > 0 and .y < 10

TODO:
    [x] static create function to take Object {var1:value1,var2:value2} etc.

    Object
        .string: String

    Map
        .has(key: Key) => Boolean
        .get(key: Key) => Value | null
        .keys: Array<Key>
        .values: Array<Value>

    Array
        let Index = Integer >= 0 and < length
        .get(index: Index) => Value
        .indexOf(value: Value) => Index | -1
        .contains(element: Value) => Boolean
        .count(element: Value) => Integer >= 0 and <= length
        .counts: Map<Value,Integer>
        .reverse: Array

    //  [ ] Patch Function
