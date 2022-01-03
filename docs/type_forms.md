## Source Form
Form as written in source code.

    class Base
        base: Number
    class Foo extends Base
        foo: Number
    class Bar extends Base
        bar: Number
    class Vector2
        x: Number
        y: Number
    class Vector3
        z: Number
    PFoo = Foo(foo >= 0)
    NFoo = Foo(foo <= 0)
    SBar = Bar(bar < 10)
    PNFoo = PFoo & NFoo
    Baz = PNFoo & SBar | Vector

## User Form
Form we use internally to track types and to report to users.
Remove intermediate type variables. Unify duplicate class references but retain them.

    Baz = Foo(foo: 0) & Bar(bar: < 10) | Vector3

## Flat Form
Completely flattened and unified along with inherited properties.

    Baz = (Base: 1, Foo: 1, Bar: 1, foo: 0, bar: < 10, base: Number) | (Vector: 1, x: Number, y: Number, z: Number)
