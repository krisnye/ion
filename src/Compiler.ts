import * as common from "./common"
import * as np from "path"
import {traverse} from "./Traversal"
import {createPass} from "./PassBuilder"

const parser = require("./parser")()

import * as input from "./phases/input" 
import * as javascript from "./phases/javascript" 
import * as output from "./phases/output"
import * as cleanup from "./phases/cleanup"
const defaultPhases = [input]//, cleanup, javascript]//, output]
const defaultPasses = [].concat(...defaultPhases.map((x:any) => x.passes))

const defaultLogger = (names?: string[], ast?: object) => {
    console.log('==================================================================')
    if (names != null) {
        console.log('// ', names)
        console.log(JSON.stringify(ast, null, 2))
    }
}

export default class Compiler {
    input: string
    output: string
    passes: any[][] = defaultPasses
    logger: (names?: string[], ast?: object) => void
    filenamesToSource: {[filename:string]:string}

    constructor(options:{
        input: string,
        output: string,
        logger?: (names?: string[], ast?: object) => void
     }){
        this.input = options.input
        this.output = options.output
        this.logger = options.logger || defaultLogger
        this.filenamesToSource = {}
    }

    compile() {
        let assembly = this.parseFiles()
        this.logger(["input"], assembly)
        try {
            for (let pass of this.passes) {
                let visitor = createPass(pass)
                assembly = traverse(assembly, visitor)
                this.logger(visitor.names, assembly)
            }
        } catch (e) {
            let location = e.location
            if (location == null)
                throw e
            let {filename} = location
            let source = this.filenamesToSource[filename]
            let error = parser.getError(e.message, location, source, location, filename)
            console.log(error.message)
        } finally {
            this.logger(["output"], assembly)
            this.logger()
        }
    }

    parseFiles(): object {
        let filenames = common.getFilesRecursive(this.input)
        let modules: any = {}
        for (let file of filenames) {
            if (file.endsWith(".ion")/* && file.indexOf('Sample1') >= 0 */) {
                let filename = file.substring(this.input.length + 1)
                let path = filename.substring(0, filename.length - ".ion".length).replace(/[\/\\]/g, '.')
                let source = common.read(file)
                this.filenamesToSource[filename] = source
                let module = parser.parse(source, filename)
                modules[path] = module
            }
        }
        return {type:'Assembly', options:{input:this.input, output:this.output}, modules}
    }

}