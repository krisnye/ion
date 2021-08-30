
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
Why?

### Allow named function expressions as a object literal shorthand for { name: () -> 2 }

Yes. Causes no confusion and is more concise.

### Variable Shadowing

Yes to shadowing external modules.
Yes to parameter shadowing instance variable.
No to any other shadowing. `foo = bar` is likely to be accidentally intended as re-assignment.

### Use = operator for property assignment?

No because `[name] = value` is indistinguishable from destructuring.
s