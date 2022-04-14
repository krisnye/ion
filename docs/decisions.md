
### Allow referencing instance variables without this?

Yes. It's much more concise and consistent with similarly scoped variables in functions

### Allow referencing base class variables without this?

No. It's harder to visualize where the variable you're referencing is defined.
Also makes it harder to perform reference analysis.

### Allow naming of function expressions?

Yes. It allows a function expression to reference and call itself recursively.
Also is nice to name a final export function the same as the file it's in.

### Allow named function expressions as alternative to `name = () ->`

No. That would be confusing as it would work in some contexts but not others.

### Allow named function expressions as a object literal shorthand for { name: () -> 2 }

Yes. Causes no confusion and is more concise.

### Variable Shadowing

Yes to shadowing external modules.
Yes to parameter shadowing instance variable.
No to any other shadowing. `foo = bar` is likely to be accidentally intended as re-assignment.

### Reassignable Function Parameters

Not sure yet. Might be useful for incrementing random number generator or combining patches.

### Use = operator for property assignment?

No because `[name] = value` is indistinguishable from destructuring.

### Allow operator overloading?

Yes. += operator would be convenient for pushing an item onto an array.

### Conditional Declarations scope?

If mutable, they should only have a refined scope up to the next assignment.

### Is a Value also a Type?

No. `Type = 1 | 2` is not the same as `value = 1 | 2`. The latter can be evaluated immediately.

### Do we need to allow cyclical module dependencies?

Probably not. I haven't yet seen a good example that would need to be modelled with cyclic dependency.

    class File
        name: String
        children: File[] | Null = null
        creationDate: Integer
        isDirectory = .children isnt Null
        isFile = !.isDirectory

### Model Intervals in AST or use individual >= and <= constraints?

We have to model intervals in order to accurately calculate type products.
Individual constraints can handle +/- but they do not handle * and / operators.

### Type inference on recursive functions?

For now we will require returnType on directly recursive functions.
Later when we bootstrap we should implement Hindley-Milner to determine recursive function types.

### Multiple Dispatch?

Yes. Combined with treating all operators as function calls can provide a simple and unified operator overloading mechanism.

### How to encode Strings?

https://utf8everywhere.org/

### Are function parameter names part of the function signature?

Con: Doesn't make sense for operators where you can't provide names.
Pro: Otherwise using optional named arguments only works for static functions.

Solution: Names for optional parameters are part of the signature.

### Are optional parameter default values part of the function signature?

Pro: They can be provided at compile time.
Con: Then all signatures must provide the same default value.
Maybe: Functions that implement same signature explicitly, don't have to specify type, so will inherit same default values as type.
