import * as common from "./common"
import * as path from "path"
import * as fs from "fs"
const { ast } = require("./ion")
import ModuleCompiler from "./ModuleCompiler"
import * as HtmlLogger from "./HtmlLogger"

export default class Compiler {
    roots: string[]
    output: string
    modules: Map<string, ModuleCompiler|null> = new Map()

    constructor(options:{
        //  the root directories containing modules
        roots: string[],
        //  the output folder we are compiling to
        output: string,
     }){
        this.roots = options.roots
        this.output = options.output
    }

    createLogger(moduleName) {
        let logfilename = path.join(this.output, ...moduleName.split('.')) +  '.debug.html' 
        return HtmlLogger.create(logfilename)
    }

    getExternalReference(path) {
        if (this.isValidExternalReference(path, null)) {
            return {moduleName: path }
        }
        let index = path.lastIndexOf('.')
        if (index < 0) {
            return null
        }
        let moduleName = path.substring(0, index)
        let exportName = path.substring(index + 1)
        if (this.isValidExternalReference(moduleName, exportName)) {
            return { moduleName, exportName }
        }
        return null
    }

    isValidExternalReference(moduleName, exportName) {
        let module = this.getModule(moduleName)
        if (module == null) {
            return false
        }
        if (exportName == null) {
            return true
        }
        return module.hasExport(exportName)
    }

    getModule(name: string): ModuleCompiler
    getModule(name: string, required: true): ModuleCompiler
    getModule(name: string, required: boolean): ModuleCompiler | null
    getModule(name: string, required: boolean = false): ModuleCompiler | null {
        // console.log('++++getModule: ' + name)
        if (!this.modules.has(name)) {
            // console.log('----loadModule: ' + name)
            let module: ModuleCompiler | null = null
            let filename = this.getModuleFilename(name)
            // console.log('----filename: ' + filename)
            if (filename != null) {
                let source = common.read(filename)
                module = new ModuleCompiler(this, name, filename, source)
            }
            this.modules.set(name, module)
        }
        let module = this.modules.get(name) as ModuleCompiler | null
        if (required && module == null) {
            throw new Error("Module not found: " + name)
        }
        return module
    }

    getModuleFilename(name: string) {
        let filename = name.replace(/\./g, path.sep) + ".ion"
        for (let root of this.roots) {
            let fullname = path.join(root, filename)
            if (common.exists(fullname)) {
                return fullname
            }
        }
        return null
    }

    compile(name: string) {
        this.getModule(name).ensureCompiled()
    }

}