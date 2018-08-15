import { Context, ParsedModule, ResolvedModule, joinPath } from "../compile"
import getUnresolvedReferences from "./getUnresolvedReferences"
import getResolvedExternalReferences from "./getResolvedExternalReferences"
import { stringify } from "../HtmlLogger"
import { SemanticError } from "../common"
// import Patch from "../Patch"
import { traverse } from "../ImmutableTraversal";
import { Identifier } from "../JsAstTypes";
const { ast } = require("../ion")

function createImportDeclarations(externalReferences: any[]) {
    return externalReferences.map(ref => {
        let name = joinPath(ref.moduleName, ref.exportName)
        return new ast.VariableDeclaration({
            location: ref.location,
            id: new ast.Id(ref),
            value: new ast.Reference(ref, { name })
        })
    })
}

function createMapFromDeclarations(declarations: any[]) {
    let map = new Map<string,any>()
    for (let d of declarations) {
        if (d.id == null) {
            console.log("Not a declaration: " + stringify(d));
        }
        map.set(d.id.name.valueOf(), d)
    }
    return map
}

function createCanonicalExportDeclaration(moduleName: string, exports: any) {
    if (Array.isArray(exports)) {
        let elements = exports.map(declaration => new ast.KeyValuePair({ key: new ast.Id(declaration.id), value: new ast.Id(declaration.id) }))
        return new ast.VariableDeclaration({
            id: new ast.Id({ name: moduleName }),
            value: new ast.ObjectLiteral({ type: "Object", elements })
        })
    }
    else {
        //  name ends
        if (exports.id.name !== moduleName.slice(moduleName.lastIndexOf(".") + 1)) {
            throw SemanticError("Export name must match the module name", exports.id)
        }
        // change the export identifier name to the global name thingy.
        return exports
        // let value = exports.value || exports
        // return new ast.VariableDeclaration(exports, { id: new ast.Id(exports.id, { name: moduleName }), value })
    }
}

function getLocalDeclarationName(moduleName: string, localName: string) {
    // if the localName is the same as the module name
    if (moduleName.endsWith(localName) && moduleName[moduleName.length - localName.length - 1] === ".") {
        return moduleName
    }
    return moduleName + ".$" + localName
}

function getLocalDeclarationNameMap(moduleName: string, declarations: any[]) {
    let map = new Map<string,string>()
    for (let d of declarations) {
        map.set(d.id.name, getLocalDeclarationName(moduleName, d.id.name))
    }
    return map
}

function renameLocalReferences(declarations: any[], localDeclarationNameMap) {
    return traverse(declarations, {
        leave(node: any, ancestors, path) {
            if (ast.Reference.is(node)) {
                let canonicalName = localDeclarationNameMap.get(node.name)
                if (canonicalName != null) {
                    return new ast.Reference(node, { name: canonicalName })
                }
            }
            if (ast.Declaration.is(node)) {
                let canonicalName = localDeclarationNameMap.get(node.id.name)
                if (canonicalName != null) {
                    return new node.constructor(node, { id: new ast.Id(node.id, { name: canonicalName }) })
                }
            }
        }
    })
}

export default function getResolvedModule(context: Context, module: ParsedModule): ResolvedModule {
    let unresolved = getUnresolvedReferences(module.ast)
    // resolved references are also external dependencies
    let dependencies = getResolvedExternalReferences(context, module.name, module.ast.imports, unresolved)
    //  everything needs to be root level declarations, then I will join them together.
    let importDeclarations = createImportDeclarations(dependencies)
    let exportDeclaration = createCanonicalExportDeclaration(module.name, module.ast.exports)

    let declarations = [...importDeclarations, ...module.ast.declarations, exportDeclaration]
    let localDeclarationNameMap = getLocalDeclarationNameMap(module.name, declarations)
    // console.log(module.name, stringify(localDeclarationNameMap))
    // now let's rename local references
    let canonicalDeclarations = renameLocalReferences(declarations, localDeclarationNameMap)

    // console.log(module.name + " => " + canonicalDeclarations.map(d => d.id.name).join(" "))

    //  dependencies...
    return { name: module.name, filename: module.ast.location.filename, declarations: canonicalDeclarations, dependencies }
}

