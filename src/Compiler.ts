import * as common from "./common"
import * as np from "path"
import {traverse} from "./Traversal"
import {createPass} from "./PassBuilder"
import * as ast from "./IonAst"

const parser = require("./parser")()

import * as input from "./phases/Input"
// import * as javascript from "./phases/javascript"
import * as output from "./phases/Output"
import * as cleanup from "./phases/Cleanup"
const defaultPhases = [input]//, cleanup, javascript]//, output]
const defaultPasses = [].concat(...defaultPhases.map((x:any) => x.passes))

function defaultLoggerFactory(path: string, filename: string) {
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
    loggerFactory: (path: string, filename: string) => (names?: string[], ast?: object) => void

    constructor(options:{
        input: string,
        output: string,
        loggerFactory?: (path: string, filename: string) => (names?: string[], ast?: object) => void
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
        const debugFilter: { [path: string]: boolean } = {
            // "ion.Number": true,
            // "ion.Integer": true,
            "ion.constants": true
        }
        let paths = common.getFilesRecursive(this.input)
            .filter(filename => filename.endsWith('.ion'))
            .map(filename => this.getPathFromFilename(filename))
            .filter(path => debugFilter[path]);

        for (let path of paths) {
            this.compileModule(path)
        }
    }

    compileModule(path: string) {
        let filename = this.getFilenameFromPath(path)
        let source = common.read(filename)
        let module = parser.parse(source, filename)
        let logger = this.loggerFactory(path, filename)

        logger([path + " input"], module)
        try {
            for (let pass of this.passes) {
                let visitor = createPass(pass)
                module = traverse(module, visitor)
                logger(visitor.names, module)
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
            logger([path + " output"], module)
            logger()
        }
    }

}