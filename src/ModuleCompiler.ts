import Compiler from "./Compiler"
import * as common from "./common"
const parser = require("./parser")()
const {ast} = require("./ion")
// import resolveImportsAndExports from "./phases/resolveImportsAndExports"
// import inheritModuleClassVariables from "./phases/inheritClassVariables"
// import createScopeMap from "./phases/createScopeMap"
import DeclarationCompiler from "./DeclarationCompiler";
import resolveImportsAndExports from "./phases/resolveImportsAndExports";

function map<K,V>(map: Map<K,V>, filter: (value, key) => any)  {
    let newMap = new Map()
    map.forEach(function(value, key) {
        newMap.set(key, filter(value, key))
    })
    return newMap
}

export default class ModuleCompiler {

    readonly compiler: Compiler
    readonly name: string
    readonly filename: string
    private _source?: string
    private _parsed?: any
    private _exports?: Map<string, string> // name => global.name
    private _dependencies?: Set<string> // global.name
    private _declarations?: Map<string, DeclarationCompiler>
    private _compiled = false

    constructor(compiler: Compiler, name, filename) {
        this.compiler = compiler
        this.name = name
        this.filename = filename
    }

    get source() {
        if (this._source == null) {
            this._source = common.read(this.filename)
        }
        return this._source
    }

    get parsedModule() {
        if (this._parsed == null) {
            this._parsed = parser.parse(this.source, this.filename)
        }
        return this._parsed
    }

    get exports() {
        if (this._exports == null) {
            let parsed = this.parsedModule
            let exports: Map<string,string> = new Map()
            exports.set("", this.name) // this module default export
            if (Array.isArray(this.parsedModule.exports)) {
                for (let name in this.parsedModule.exports) {
                    let declaration = this.parsedModule.exports[name]
                    exports.set(name, declaration)
                }
            }
            this._exports = exports
        }
        return this._exports
    }

    get declarations() {
        if (this._declarations == null) {
            let map = new Map()
            let declarations = resolveImportsAndExports(this)
            for (let declaration of declarations) {
                map.set(declaration.id.name, new DeclarationCompiler(this.compiler, declaration))
            }
            // must create global declarations here and register them in the compilers global scope object
            //  1. Resolve Implicit Imports and convert to Global References
            //  2. Convert Explicit Imports to Global References
            //  3. Convert All References to Module Scoped Variables to Global References
            //  4. Create Default Object Export if Library
            console.log('resolve declarations : ' + this.name)
            this._declarations = map
        }
        return this._declarations
    }

    _writeCompileDebugFile() {
        let logger = this.compiler.createLogger(this.name)
        logger("Loading", this.source);
        if (this.parsedModule) {
            logger("Parsed", this.parsedModule)
        }
        if (this.declarations) {
            let resolvedDeclarations = map(this.declarations, (dc) => dc.resolvedDeclaration)
            logger("Resolved Declarations", resolvedDeclarations)

            logger("Output", resolvedDeclarations)
        }
        logger()
    }

    get compiled() {
        return this._compiled
    }

    compile() {
        if (!this._compiled) {
            console.log('compiling: ' + this.name)
            this.declarations
            this._writeCompileDebugFile()
            // now compile dependencies recursively.
        }
    }

}