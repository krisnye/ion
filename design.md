
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

CompileUnit -> is a new object type used in compilation.
    What dependency does one module have on another module?
    For every exported variable:
        What is the value type:
            Class
            Type
            Function
            Value

CompileUnit
    .exports: Map<String | null, Declaration>
    .getExportType(name: String | null)
    .compile(): Map<String,File>

ExternalReference
    module: String
    name: String | null

Compiler
    getModule(name: String): CompileUnit

Decision: -> Don't focus on performance or separate files for THIS version.
Just get valid type checking and support for functions.

