
imports, exports, dependencies and global namespace references

All external dependencies should be visibly declared at the top of the file. (import)
    We allow import namespace.* in order to make it easier to pull in many modules. 
All exported variables should be visibly declared at the bottom of the file. (export)
This allows us to look at the top and bottom and skip the implementation details in the middle.

Should we allow implicit global references from within a file like C#?
    No, because that would make external dependencies harder to reason about.

This means that the ONLY explicit global references to external modules are in the import section.

Import .* is potentially a general way of bringing static variables into the local scope.
    It should only be used for modules.
    It is OK for all exported variables from a module.
    For instance:
        // Math.ion
            export
                let pi = 3.14
                let e = 2.71828
                let round = a ->
                let floor = a ->
                let ceiling = a ->
        //  MyClass.ion
            import
                Math.*

            let circumference = 2 * pi
            let foo = round(e ^ pi)
