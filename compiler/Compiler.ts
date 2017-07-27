import * as common from "./common"
import * as np from "path"
import {traverse} from "./Traversal"
import defaultPasses from "./Passes"
const defaultLogger = (name?: string, ast?: object) => {
    console.log('==================================================================')
    if (name != null) {
        console.log('// ', name)
        console.log(JSON.stringify(ast, null, 2))
    }
}

export default class Compiler {

    input: string
    output: string
    namespace: string
    passes: ((ast:object) => object)[]
    logger: (name?: string, ast?: object) => void

    constructor(options:{
        input: string,
        output: string,
        namespace: string,
        passes?: ((ast:object) => object)[]
        logger?: (name: string, ast: object) => void
    }){
        this.input = options.input
        this.output = options.output
        this.namespace = options.namespace
        this.passes = options.passes || defaultPasses
        this.logger = options.logger || defaultLogger
    }

    compile() {
        let assembly = this.parseFiles()
        this.logger("parser", assembly)
        for (let pass of this.passes) {
            assembly = pass(assembly)
            this.logger(pass.name, assembly)
        }
        this.logger()
    }

    parseFiles(): object {
        let parser = require("./parser")()
        let filenames = common.getFilesRecursive(this.input)
        let modules = []
        for (let file of filenames) {
            if (file.endsWith(".ion") && file.indexOf('ast') < 0) {
                let filename = np.join(this.namespace, file.substring(this.input.length))
                let path = filename.substring(0, filename.length - ".ion".length).replace(/\//g, '.')
                let module = parser.parse(common.read(file), filename)
                modules.push(module)
            }
        }
        return {type:'Assembly', namespace:this.namespace, modules}
    }

}