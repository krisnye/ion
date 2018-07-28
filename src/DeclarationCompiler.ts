import Compiler from "./Compiler"
import * as common from "./common"

export default class DeclarationCompiler {

    readonly compiler: Compiler
    readonly resolvedDeclaration

    constructor(compiler: Compiler, resolvedDeclaration) {
        this.compiler = compiler
        this.resolvedDeclaration = resolvedDeclaration
    }

    get canonicalName() {
        return this.resolvedDeclaration.id.name
    }

}