import * as common from "./common"
import * as np from "path"
import {traverse} from "./Traversal"
import {createPass} from "./PassBuilder"
import ion from "./ion"
const {ast} = ion

const parser = require("./parser")()

// import * as input from "./phases/Input"
// import * as optimizer from "./phases/Optimizer"
// import * as javascript from "./phases/Javascript"
// import * as output from "./phases/Output"
// import * as cleanup from "./phases/Cleanup"
import * as input from "./phases2/Input"

const defaultPhases = [input]
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
    input: string[]
    output: string
    passes: any[][] = defaultPasses
    loggerFactory: () => (names?: string[], ast?: object) => void

    constructor(options:{
        input: string[],
        output: string,
        loggerFactory?: () => (names?: string[], ast?: object) => void
     }){
        this.input = options.input
        this.output = options.output
        this.loggerFactory = options.loggerFactory || defaultLoggerFactory
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
            "ion.Map": true,
            "ion.Array": true,
            "sample.Point2": true,
            "sample.Point3": true
        }
        let paths = common.getFilesRecursive(this.input)
            .filter(({ filename }) => filename.endsWith('.ion'))
            .filter(({ path }) => debugFilter[path]);

        let modules = new Map()
        for (let { filename,path } of paths) {
            let source = common.read(filename)
            let module = parser.parse(source, filename)
            modules.set(path, module)
        }

        return new ion.ast.InputRoot({
            options: new ion.ast.Options({ input:this.input,output:this.output }), modules
        })
    }

    compileAssembly(assembly: ast.Assembly) {
        let logger = this.loggerFactory()

        logger(["input"], assembly)
        try {
            for (let pass of this.passes) {
                if (typeof pass === 'function') {
                    let custom: any = pass
                    assembly = custom(assembly)
                    logger(custom.name, assembly)
                }
                else {
                    let visitor = createPass(pass)
                    assembly = traverse(assembly, visitor)
                    logger(visitor.names, assembly)
                }
            }
        } catch (e) {
            let location = e.location
            if (location == null)
                throw e
            let {filename} = location
            let source = common.read(filename)
            let error = parser.getError(e.message, location, source, filename)
            console.log(error.message)
        } finally {
            logger(["output"], assembly)
            logger()
        }

        return assembly
    }

}