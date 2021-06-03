import fs from "fs";
import path from "path";
import { read, exists } from "../../common";
import { Options } from "../../Compiler";
import Assembly from "../../ast/Assembly";
import { traverse, skip } from "../../Traversal";
import Module from "../../ast/Module";
import Output from "../../ast/Output";
const escodegen = require("../../../external/escodegen");

export const verbatim = "verbatim"

export function codegen(ast) {
    return escodegen.generate(ast, { verbatim, comment: true })
}

export function getNativeFile(moduleName: string, options: Options): string | null {
    for (let input of options.inputs) {
        let filename = path.join(input, moduleName.replace('.', path.sep) + ".ts")
        if (exists(filename)) {
            return filename;
        }
    }
    return null;
}

export function removePrewritten(root: Assembly, options: Options) {
    return traverse(root, {
        enter(node) {
            if (Module.is(node)) {
                return skip
            }
        },
        leave(node, ancestors, path) {
            if (Module.is(node)) {
                let moduleName = path[path.length - 1]
                let nativeFile = getNativeFile(moduleName, options)
                if (nativeFile) {
                    let module = root.modules.get(moduleName)
                    //  just remove all declarations
                    //  we don't remove the module entirely though
                    //  since it's presence still is used to know to write the native later.
                    return new Module({ declarations: [] })
                }
            }
        }
    })
}

export default function toTypescriptFiles(root: Output, options: Options) {
    let files = new Map<string,string>()
    for (let moduleName of root.files.keys()) {
        let module = root.files.get(moduleName)
        let nativeFile = getNativeFile(moduleName, options)
        let content = nativeFile ? read(nativeFile) : codegen(module)
        let outputFile = moduleName.replace('.', '/') + '.ts'
        files.set(outputFile, content)
    }
    return new Output({ files })
}