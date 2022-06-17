
# Phase Zero. Bare Javascript.

## Javascript Representation

class       =>  class, with multiple inheritance and `is` function.
Array       =>  Array, do arrays have an explicit element type? Empty arrays?
Map         =>  Map
Number      =>  number
String      =>  string
Object      =>  object literal { ... }
function    =>  function

## Reference Counting?

Yes on Collections (Array, Map)
No on everything else, if we can prove sole ownership then mutate in place.

# Phase One. Partial Web Assembly.

- Struct array types allocated within Web Assembly shared memory (implemented in Javascript).
- Functions with struct array arguments (and all other value types) are implemented in Web Assembly.

# Phase Two. Full Web Assembly?

I'm not sure we would even need this. Javascript can serve as a handy scripting/binding language.
Could use V8 and OpenGL from the command line for Native applications.
https://github.com/borisvanschooten/glesjs

- String representation.
- Full Memory Allocator.
- Multifunction routing.