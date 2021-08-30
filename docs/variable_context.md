//  module
x = 10
y: Number = 20
//  class
class Vector
    x: Number
    y: Number
    z: Number = 0
//  function
(x, y) ->
    z = 1
    w = 2
//  Map
{}
    //  only things with [brackets] are emitted to outer Map
    [0] = 12
    ["foo"] = bar
    [Vector(10, 20)] = 30
//  instances
Vector3()
    x = 0
    y = x * x
//  anonymous class instance
()
    void v = 10
    x = v * v
    y = x * x
//  array
[]
    a = 1
    b = 2
    c =
        if foo
            10
        else
            20

                    Assignment          Property        VariableDeclaration
                    name = value        name: Type      name: Type = value
module              const
function body       const                               var, initialized
class body          static const        property        property with default
expression > block  const, emit last                    var, initialized, emit last
array > block       const, emit                         var, initialized, emit
function params     param with default                  param with default
object              const, emit                         var, initialized, emit

//  problem: emitting a dynamic property with = operator looks just like a destructure
[12] = 10
//  What about no destructuring? Significantly simplifies the language.
//  solution: we need explicit emission syntax
