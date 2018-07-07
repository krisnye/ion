import Compiler from "./Compiler2"
import * as common from "./common"
const parser = require("./parser")()
const {ast} = require("./ion")
import resolveImports from "./phases2/resolveImports"

export default class ModuleCompiler {

    private compiler: Compiler
    private name: string
    private filename: string
    private source: string
    private originalAst: any
    private exports: Map<string|null,any> = new Map()
    private resolvedAst: any

    constructor(compiler: Compiler, name, filename, source) {
        this.compiler = compiler
        this.name = name
        this.filename = filename
        this.source = source
    }

    hasExport(name: string) {
        this._ensureParsed()
        return this.exports.has(name)
    }

    _extractExports() {
        this.exports.clear()
        if (Array.isArray(this.originalAst.exports)) {
            for (let name in this.originalAst.exports) {
                this.exports.set(name, this.originalAst.exports[name])
            }
        }
    }

    _ensureParsed() {
        if (this.originalAst == null) {
            try {
                this.originalAst = parser.parse(this.source, this.filename)
                this._extractExports()
            }
            catch (e) {
                this._logError(e)
            }
        }
    }

    _ensureResolved() {
        if (this.resolvedAst == null) {
            try {
                this.resolvedAst = resolveImports(this.compiler, this.name, this.originalAst)
            }
            catch (e) {
                this._logError(e)
            }
        }
    }

    _logError(e) {
        let location = e.location
        if (location == null)
            throw e
        let { filename } = location
        let source = common.read(filename)
        let error = parser.getError(e.message, location, source, filename)
        console.log(error.message)
    }

    _logDebug() {
        let logger = this.compiler.createLogger(this.name)
        this._ensureParsed()
        if (this.originalAst)
            logger("parsed", this.originalAst)
        this._ensureResolved()
        if (this.resolvedAst)
            logger("resolved", this.resolvedAst)
        logger()
    }

    compile() {
        this._ensureParsed()
        this._ensureResolved()
        this._logDebug()
    }

}