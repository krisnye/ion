import Compiler from "./Compiler"
import * as common from "./common"

export default class DeclarationCompiler {

    readonly compiler: Compiler
    readonly canonicalName: string
    readonly resolvedDeclaration

    constructor(compiler: Compiler, canonicalName: string, resolvedDeclaration) {
        this.compiler = compiler
        this.canonicalName = canonicalName
        this.resolvedDeclaration = resolvedDeclaration
    }

}