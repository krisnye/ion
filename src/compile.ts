
//import { memoize, intern } from "./functional"
function memoize<A extends Function>(a: A) { return a }
function intern<A>(a: A) { return a }
import * as np from "path"
import { getResolvedModulesAndDependencies } from "./phases/getResolvedModulesAndDependencies";
import getSortedRootNodes from "./phases/getSortedRootNodes"
import { create as createLogger, stringify } from "./HtmlLogger"
import * as common from "./common"
import File from "./File"
import getResolvedModule from "./phases/getResolvedModule"
import { flatten } from "./Traversal"
const { ast } = require("./ion")
const parser = require("./parser")()
type Logger = (name?: string, ast?: any) => void

export class Context {

    files: Map<string, File>
    output: File
    loggers = new Map<string, Logger>()

    constructor(files: Map<string, File>, output: File) {
        this.files = files
        this.output = output
    }

    getOutputFilePath(module: string, extension: string = ".js") {
        return np.join(this.output.path, module.replace(/\./g, np.sep)) + extension
    }

    getLogger(filename: string) {
        let logger = this.loggers.get(filename)
        if (logger == null) {
            //  get logger file path
            let path = this.getOutputFilePath(filename.slice(0, filename.lastIndexOf('.')), ".html")
            this.loggers.set(filename, logger = createLogger(path))
        }
        return logger
    }

    debug(filename: string, phase?: string, ast?: any) {
        this.getLogger(filename)(phase, ast)
    }

    debugFiltered(phase: string, declarations: any[]) {
        let allName = "global.ion"
        for (let filename of this.loggers.keys()) {
            if (filename !== allName) {
                let ast = declarations.filter(d => d.location.filename === filename)
                this.debug(filename, phase, { declarations: ast })
            }
        }
        // also log an all file
        this.debug(allName, phase, { declarations })
    }

    debugEnd() {
        for (let filename of this.loggers.keys()) {
            this.debug(filename)
        }
    }

    getParsedModule(moduleName: string) { return getParsedModule(this, moduleName) }
    getResolvedModule(moduleName: string) { return getResolvedModule(this, this.getParsedModule(moduleName)) }
    getExports(moduleName: string) { return getExports(this.getParsedModule(moduleName)) }
    getExternalReference(moduleName: string, ref) {
        if (this.files.has(moduleName)) {
            let exports = this.getExports(moduleName)
            if (exports != null && exports.has(ref.name)) {
                return new ast.ExternalReference(ref, { moduleName, exportName: ref.name })
            }
        }
        // see if the full path is a module
        let fullpath = joinPath(moduleName, ref.name)
        if (this.files.has(fullpath)) {
            return new ast.ExternalReference(ref, { moduleName: fullpath })
        }
        return null
    }

}

export type ParsedModule = {
    name: string,
    ast: any
}

const read = memoize(function(file: File) {
    return common.read(file.path)
})

function merge(...maps: Map<string,any>[]) {
    let merged = new Map<string,any>()
    for (let map of maps) {
        map.forEach((value, key) => {
            merged.set(key, value)
        })
    }
    return merged
}

const getExports = memoize(function(module: ParsedModule){
    if (module == null) {
        return null
    }
    let exports: Map<string, string> = new Map<string,string>()
    exports.set("", module.name) // this module default export
    if (Array.isArray(module.ast.exports)) {
        for (let name in module.ast.exports) {
            let declaration = module.ast.exports[name]
            exports.set(name, declaration)
        }
    }
    return exports
})

export function joinPath(path, add) {
    return path.length > 0 ? (add.length > 0 ? path + "." + add : path) : add
}

export function getParentPath(path) {
    let index = path.lastIndexOf('.')
    return index < 0 ? path : path.slice(0, index)
}

const parse = memoize(function(name: string, file: File): ParsedModule {
    let source = read(file)
    let filename = name.replace(/\./g, '/') + ".ion"
    return { name, ast: parser.parse(source, filename) }
})

export function getParsedModule(context: Context, name: string) {
    let file = context.files.get(name)
    if (file == null) {
        throw new Error("Module not found: " + name)
    }
    return parse(name, file)
}

export type ResolvedModule = {
    name: string,
    filename: string,
    declarations: any[]     //  ast.Declaration[]
    dependencies: any[]     //  ast.ExternalReference[]
}

function reportError(e, context: Context) {
    let location = e.location
    if (location == null)
        throw e
    let { filename } = location
    let path = common.getPathFromFilename(filename)
    let file = context.files.get(path)
    if (file == null) {
        console.log(e);
        console.log("Source file not found: " + filename)
        return
    }
    let source = read(file)
    let error = parser.getError(e.message, location, source, filename)
    console.log(error.message)
}

function getResolvedModules(context: Context, modules: string[]) {
    let resolvedModules = new Map<string, ResolvedModule>()
    for (let module of modules) {
        getResolvedModulesAndDependencies(context, module, resolvedModules)
    }
    return resolvedModules
}

export default function compile(options: {
    //  the root directories containing modules
    roots: string[],
    //  the output folder we are compiling to
    output: string,
    //  the modules we are compiling
    modules: string[]
}) {
    let context = new Context(common.getFilesRecursive(options.roots), new File(options.output))
    try {
        let resolvedModules = getResolvedModules(context, options.modules)
        let declarations = flatten(Array.from(resolvedModules.values()).map(m => m.declarations))
        //  ok, now we have the declarations, what now?
        //  previously we had simplification, etc.
        //  the only thing we really need is to fix named function call orders
        //  and to have strong runtime types
        //  and then write out generated code

        let sorted = getSortedRootNodes(declarations)
        context.debugFiltered("Sorted", sorted)

        //  Next: Class Inheritance

        context.debugFiltered("Output", sorted)
        context.debugEnd()

        console.log(sorted.map(d => d.id.name))
    }
    catch (e) {
        reportError(e, context)
    }
}