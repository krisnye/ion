
Phases

    Loading: ModuleCompiler#constructor
        loads a source module
        The ModuleCompiler manages all further phases

    Parsing: parser.pegs, ModuleCompiler#_ensureParsed
        parses the module source file
        returns an ion.ast.Module
        creates a list of named exports
        at this point an external module can query this module and check it's exports

    Dependency Resolution: phases/resolveImportsAndExports.md, ModuleCompiler#_ensureDependenciesResolved
        resolves imports and causes other potential module dependencies to be parsed
        all import steps referencing a modules default export are converted to ImportDeclarations
        all import steps referencing a named export are converted into a default export ImportDeclaration
            and then a member access operation to get the named export.
        named export objects are turned into a single object which then becomes the default export
        default export objects are turned into a single ExportStatement
        all statements are combined into a the body of a new BlockStatement which is returned
        This is stored as ModuleCompiler.resolved: ion.ast.BlockStatement
        At this point some references to inherited class variables may still not have been resolved yet

    Class Inheritance
        creates a scope map so each node can find any referenced declarations.
        Locates all extended Class declarations and then inherits their variables.
