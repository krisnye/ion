
ion/
    Number.ion  //  class Number ; constant = 10 ; _private = 20
    math/
        cos.ion //  cos = () => 1 ; pi = 3
        sin.ion //  sin = () => 2

//  yields

//  if var name uses same name as file then collapse names together
:ion.Number = class Number
:ion.Number.constant = 10
:ion.Number._private = 20
:ion.math.cos = () => 1
:ion.math.cos.pi = 3
:ion.math.sin = () => 2
