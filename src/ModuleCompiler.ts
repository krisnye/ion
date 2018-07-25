import Compiler from "./Compiler"
import * as common from "./common"
const parser = require("./parser")()
const {ast} = require("./ion")
// import resolveImportsAndExports from "./phases/resolveImportsAndExports"
// import inheritModuleClassVariables from "./phases/inheritClassVariables"
// import createScopeMap from "./phases/createScopeMap"
import DeclarationCompiler from "./DeclarationCompiler";

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

    get parsed() {
        if (this._parsed == null) {
            this._parsed = parser.parse(this.source, this.filename)
        }
        return this._parsed
    }

    get exports() {
        if (this._exports == null) {
            let parsed = this.parsed
            let exports: Map<string,string> = new Map()
            exports.set("", this.name) // this module default export
            if (Array.isArray(this.parsed.exports)) {
                for (let name in this.parsed.exports) {
                    let declaration = this.parsed.exports[name]
                    exports.set(name, declaration)
                }
            }
            this._exports = exports
        }
        return this._exports
    }

    get declarations() {
        if (this._declarations == null) {
            this._declarations = new Map()
            // must create global declarations here and register them in the compilers global scope object
            //  1. Resolve Implicit Imports and convert to Global References
            //  2. Convert Explicit Imports to Global References
            //  3. Convert All References to Module Scoped Variables to Global References
            //  4. Create Default Object Export if Library
            console.log('resolve declarations : ' + this.name)
        }
        return this._declarations
    }

    get compiled() {
        return this._compiled
    }

    compile() {
        if (!this._compiled) {
            console.log('compiling: ' + this.name)
            this.declarations
            // now compile dependencies recursively.
        }
    }

}