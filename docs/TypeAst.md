
let string: /[a-zA-Z\.]+@[a-zA-Z\.]+/

What, conceptually, is a "Type"?
    - At compile time it can tell you the relation between itself and all other types. (Always, Never, Sometimes instances of each other)
    - At runtime it can tell you if any instance is of it's Type or not.
    Calculating runtime checks is very easy so we choose an internal data format that makes compile time checks simpler
In Typescript,
    Classes are runtime "Types", and they have a .is function
    Typescript Types can NOT have a .is function
        So we can do this:
            type _TypeName = number
            const TypeName = { is(value){ return constraint checkes } }

