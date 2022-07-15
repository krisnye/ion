
Set one or more values on an Object

    &person.with( name = "Kris", age = 50 )
    &person.with()
        name = "Kris"
        age = 50
        //  other values are implicitly undefined

Set one value on a Map.

    &map.set("foo", "bar")

Set multiple values on a Map.

    map += { "foo" -> "Bar", 1 -> 2 }

Remove one value from a Map.

    &map.remove("foo")

Remove multiple values from a Map.

    &map.remove(["foo", "bar", "baz])

Push one value onto array.

    &array.push("foo")

Pop one value from array.

    [array, value] = array.pop()
    value = &array.pop()

Splice values out of array.

    &array.splice(index, remove, add)

Set one value on array.

    &array.set(5, "five")

Set multiple values on array.

    &array.set(5, "five")
    &array.set(6, "six")
    &array.set(7, "seven")
