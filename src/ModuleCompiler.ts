import Compiler from "./Compiler"
import * as common from "./common"
const parser = require("./parser")()
const {ast} = require("./ion")
import resolveImportsAndExports from "./phases2/resolveImportsAndExports"

export default class ModuleCompiler {

    private compiler: Compiler
    private name: string
    private filename: string
    private source: string
    private module: any // ast.Module
    private imports: Set<string> = new Set()
    private exports: Set<string> = new Set()
    private resolved: any // ast.BlockStatement

    constructor(compiler: Compiler, name, filename, source) {
        this.compiler = compiler
        this.name = name
        this.filename = filename
        this.source = source
    }

    hasExport(name: string) {
        if (name == null) {
            // null -> default export
            return true
        }
        else {
            this._ensureParsed()
            return this.exports.has(name)
        }
    }

    _getExternalReference(fullPath) {
        // track this as an import module dependency
        let ref = this.compiler.getExternalReference(fullPath)
        if (ref != null) {
            this.imports.add(ref.moduleName)
        }
        return ref
    }

    _extractExports() {
        this.exports.clear()
        if (Array.isArray(this.module.exports)) {
            for (let name in this.module.exports) {
                this.exports.add(name)
            }
        }
    }

    _ensureParsed() {
        if (this.module == null) {
            this.module = parser.parse(this.source, this.filename)
            this._extractExports()
        }
    }

    _ensureImportsResolved() {
        if (this.resolved == null) {
            this.resolved = resolveImportsAndExports(this, this.name, this.module)
        }
    }

    _reportError(e) {
        let location = e.location
        if (location == null)
            throw e
        let { filename } = location
        let source = common.read(filename)
        let error = parser.getError(e.message, location, source, filename)
        console.log(error.message)
    }

    _writeCompileDebugFile() {
        let logger = this.compiler.createLogger(this.name)
        this._ensureParsed()
        logger("parsed", this.module)
        this._ensureImportsResolved()
        logger("resolved imports and exports", this.resolved)
        logger("output", this.resolved)
        logger()
    }

    ensureCompiled() {
        if (this.resolved == null) {
            try {
                this._ensureParsed()
                this._ensureImportsResolved()
                this._writeCompileDebugFile()
            }
            catch (e) {
                this._reportError(e)
            }
            // now also ensure that dependencies are compiled, recursively.
            for (let path of this.imports.values()) {
                this.compiler.getModule(path, true).ensureCompiled()
            }
        }
    }

}