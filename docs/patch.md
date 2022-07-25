
## Object

Set values on an Object

    //  copy on write
    person.name = "Kris"
    //  copy on write
    person.
        name = "Kris"
        age = 50

## Map

Set value on a Map.

    //  copy on write
    map["foo"] = "bar"

Remove one value from a Map.

    map = map.remove("foo")

Push one value onto array.

    [array, value] = array.push("foo")
    value = array!push("foo")

Push multiple values onto an array.

    array += ["foo"]

Pop one value from array.

    [array, value] = array.pop()
    value = array!pop()

Splice values out of array.

    array = array.splice(index, remove, add)

Set one value on array.

    array = array.set(5, "five")
    //  sugar? why not? might as well just do it.
    array[5] = "five"

Set multiple values on array.

    array[5] = "five"
    array[6] = "six"
    array[7] = "seven"
