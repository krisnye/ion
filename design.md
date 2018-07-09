
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

ObjectExpressions in ion?
    Array Literal
        [ 10, 20, true, false, "foo", bar ]
        Array( 10, 20, true, false, "foo", bar )
        ObjectLiteral
            type: 'Array'
            elements: Expression[]
    Map Literal
        [ varName: 10, "y": 20, "z": 20, 10: 30, true: null, false: true ]
        Map( varName: 10, "y": 20, "z": 20, 10: 30, true: null, false: true )
        ObjectLiteral
            type: 'Map'
            elements: KeyValuePair[]
    Object Literal
        { x: 10, y: 20, z: z }
        Object( x: 10, y: 20, z: z )
        ObjectLiteral
            type: 'Object'
            elements: KeyValuePair[]
    Set Literal
        { x, y, 20, 30 }
        Set( x, y, 20, 30 )
        ObjectLiteral
            type: 'Set'
            elements: Expression[]

Design Decision: Require name:value on Object Literals.
Although the { nameAndValue } syntax is handy in Javascript,
In Ion we should usually be returning more strongly typed objects anyways in which case the syntax would be:
    return Point( x: 10, y: 20)
        or
    return Point( x, y )
        or... if the return type of the function is explicit then it could be an implicit
    return (x, y)

Todo:
    [ ] Change ExternalReference to just reference a single, or maybe retain explicit ImportDeclaration and ExportDeclaration statements.....??????
    [ ] InputModule -> Resolve in one step to ResolvedModule
    [ ] Define Module with ImportDeclaration and ExportDeclaration