import * as common from "./common"
import * as path from "path"
import * as fs from "fs"
const { ast } = require("./ion")
import ModuleCompiler from "./ModuleCompiler"
import * as HtmlLogger from "./HtmlLogger"
import { SemanticError } from "./common"
import DeclarationCompiler from "./DeclarationCompiler";

export default class Compiler {
    roots: string[]
    output: string
    modules: Map<string, ModuleCompiler|null> = new Map()
    readonly globalScope = {}

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

    getExternalReferencePath(path): string | null {
        if (this.isValidExternalReference(path)) {
            return path
        }
        let index = path.lastIndexOf('.')
        if (index < 0) {
            return null
        }
        let moduleName = path.substring(0, index)
        let exportName = path.substring(index + 1)
        if (this.isValidExternalReference(moduleName, exportName)) {
            return moduleName + "." + exportName
        }
        return null
    }

    isValidExternalReference(moduleName, exportName = "") {
        let module = this.getModule(moduleName)
        if (module == null) {
            return false
        }
        return module.exports.has(exportName)
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
                module = new ModuleCompiler(this, name, filename)
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

    // //  TODO: After module name is added to Location then remove sourceModule argument.
    // getResolvedDeclaration(node, sourceModule: ModuleCompiler) {
    //     if (ast.Reference.is(node)) {
    //         let scope = sourceModule.getResolvedScope(node)
    //         let referencedDeclaration = scope[node.name]
    //         if (referencedDeclaration == null)
    //             throw SemanticError("Type reference not found: " + node.name, node.location)
    //         return this.getResolvedDeclaration(referencedDeclaration, sourceModule)
    //     }
    //     else if (ast.ImportDeclaration.is(node)) {
    //         let referencedModule = this.getModule(node.module.name, true)
    //         let referencedExport = referencedModule.getResolvedExport()
    //         return this.getResolvedDeclaration(referencedExport, referencedModule)
    //     }
    //     else {
    //         return node
    //     }
    // }

    compile(name: string) {
        this.getModule(name).compile()
    }

}