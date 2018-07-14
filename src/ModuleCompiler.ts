import Compiler from "./Compiler"
import * as common from "./common"
const parser = require("./parser")()
const {ast} = require("./ion")
import resolveImportsAndExports from "./phases/resolveImportsAndExports"
import inheritClassVariables from "./phases/inheritClassVariables"
import createScopeMap from "./phases/createScopeMap"

export default class ModuleCompiler {

    readonly compiler: Compiler
    readonly name: string
    readonly filename: string
    readonly source: string
    private exports: Map<string,any> = new Map()
    private imports: Set<string> = new Set()

    private parsedModule: any // ast.Module
    private resolvedModule: any // ast.BlockStatement
    private resolvedModuleScopeMap: Map<any,object>
    private inheritedModule: any // ast.BlockStatement

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
            let exports = this.getExports()
            return exports.has(name)
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

    getExports() {
        if (this.exports == null) {
            this.exports = new Map()
            this.getParsedModule()
            if (Array.isArray(this.parsedModule.exports)) {
                for (let name in this.parsedModule.exports) {
                    let declaration = this.parsedModule.exports[name]
                    this.exports.set(name, declaration)
                }
            }
        }
        return this.exports
    }

    getParsedModule() {
        if (this.parsedModule == null) {
            this.parsedModule = parser.parse(this.source, this.filename)
        }
        return this.parsedModule;
    }

    getResolvedModule() {
        if (this.resolvedModule == null) {
            this.resolvedModule = resolveImportsAndExports(this)
        }
        return this.resolvedModule
    }

    getResolvedModuleScopeMap() {
        if (this.resolvedModuleScopeMap == null) {
            this.resolvedModuleScopeMap = createScopeMap(this.resolvedModule)
        }
        return this.resolvedModuleScopeMap
    }

    getResolvedExport() {
        let resolvedModule = this.getResolvedModule()
        let exportStatement = resolvedModule.statements[resolvedModule.statements.length - 1]
        return exportStatement.value
    }

    getInheritedModule() {
        if (this.inheritedModule == null) {
            this.inheritedModule = inheritClassVariables(this)
        }
        return this.inheritedModule
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
        logger("Loading", this.source);
        if (this.parsedModule) {
            logger("Parsing", this.parsedModule)
        }
        if (this.resolvedModule) {
            logger("Dependency Resolution", this.resolvedModule)
        }
        if (this.inheritedModule) {
            logger("Class Inheritance", this.inheritedModule)
            logger("Output", this.resolvedModule)            
        }
        logger()
    }

    ensureCompiled() {
        if (this.resolvedModule == null) {
            try {
                this.getInheritedModule()
            }
            catch (e) {
                this._reportError(e)
            }
            this._writeCompileDebugFile()
            // now also ensure that dependencies are compiled, recursively.
            for (let path of this.imports.values()) {
                this.compiler.getModule(path, true).ensureCompiled()
            }
        }
    }

}