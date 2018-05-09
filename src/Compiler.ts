import * as common from "./common"
import * as np from "path"
import {traverse} from "./Traversal"
import {createPass} from "./PassBuilder"
import * as ast from "./IonAst"

const parser = require("./parser")()

import * as input from "./phases/Input"
import * as optimizer from "./phases/Optimizer"
import * as javascript from "./phases/Javascript"
import * as output from "./phases/Output"
import * as cleanup from "./phases/Cleanup"
const defaultPhases = [input, optimizer, javascript, output]
const defaultPasses = [].concat(...defaultPhases.map((x:any) => x.passes))

function defaultLoggerFactory() {
    return (names?: string[], ast?: object) => {
        console.log('==================================================================')
        if (names != null) {
            console.log('// ', names)
            console.log(JSON.stringify(ast, null, 2))
        }
    }
}

export default class Compiler {
    input: string
    output: string
    passes: any[][] = defaultPasses
    loggerFactory: () => (names?: string[], ast?: object) => void

    constructor(options:{
        input: string,
        output: string,
        loggerFactory?: () => (names?: string[], ast?: object) => void
     }){
        this.input = options.input
        this.output = options.output
        this.loggerFactory = options.loggerFactory || defaultLoggerFactory
    }

    getPathFromFilename(filename: string) {
        filename = filename.substring(this.input.length + 1)
        return filename.substring(0, filename.length - '.ion'.length).replace(/[\/\\]/g, '.')
    }

    getFilenameFromPath(path: string) {
        return this.input + '/' + path.replace(/\./g, '/') + '.ion'
    }

    compile() {
        let assembly = this.parseAssembly()
        assembly = this.compileAssembly(assembly)
    }

    parseAssembly() {
        const debugFilter: { [path: string]: boolean } = {
            "ion.Type": true,
            "ion.Number": true,
            "ion.Integer": true,
            "ion.constants": true,
            "ion.true": true,
            "ion.Native": true,
            "ion.String": true,
            "sample.Point2": true,
            "sample.Point3": true
        }
        let paths = common.getFilesRecursive(this.input)
            .filter(filename => filename.endsWith('.ion'))
            .map(filename => this.getPathFromFilename(filename))
            .filter(path => debugFilter[path]);

        let assembly = new ast.Assembly({ options:{input:this.input, output:this.output}, namespaces: {} })
        for (let path of paths) {
            let filename = this.getFilenameFromPath(path)
            let source = common.read(filename)
            let module = parser.parse(source, filename)
            assembly.namespaces[path] = module
        }

        return assembly
    }

    compileAssembly(assembly: ast.Assembly) {
        let logger = this.loggerFactory()

        logger(["input"], assembly)
        try {
            for (let pass of this.passes) {
                let visitor = createPass(pass)
                assembly = traverse(assembly, visitor)
                logger(visitor.names, assembly)
            }
        } catch (e) {
            let location = e.location
            if (location == null)
                throw e
            let {filename} = location
            let source = common.read(filename)
            let error = parser.getError(e.message, location, source, location, filename)
            console.log(error.message)
        } finally {
            logger(["output"], assembly)
            logger()
        }

        return assembly
    }

}