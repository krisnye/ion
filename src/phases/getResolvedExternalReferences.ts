import { Context, joinPath, getParentPath } from "../compile"
const { ast } = require("../ion")

function getExternalReferenceFromImportSteps(context: Context, modulePath, ref, steps, path = "") {
    for (let step of steps) {
        // root path relative
        let stepPath = path
        if (step.relative && stepPath.length == 0) {
            stepPath = getParentPath(modulePath)
        }
        let wildcard = step.as == null && step.id == null
        if (wildcard) {
            let externalRef = context.getExternalReference(stepPath, ref);
            if (externalRef) {
                return externalRef
            }
        }
        else if (step.id && step.children.length > 0) {
            let result = getExternalReferenceFromImportSteps(context, modulePath, ref, step.children, joinPath(path, step.id.name))
            if (result != null)
                return result
        }
    }
    return null
}

const implicitImports = [
    new ast.ImportStep({ relative: true, id: null, children: [] }), // .*
    new ast.ImportStep({ relative: false, id: new ast.Id({ name: "ion" }), children: [new ast.ImportStep({ relative: true, id: null, children: [] })] }), // ion.*
]

export default function getResolvedExternalReferences(context: Context, modulePath: string, importSteps, unresolved: Map<string, any>) {
    // add default imports
    importSteps = [...implicitImports, ...importSteps]

    let externalReferences: any[] = [] // ast.ExternalReference
    for (let ref of unresolved.values()) {
        let externalRef = getExternalReferenceFromImportSteps(context, modulePath, ref, importSteps)
        if (externalRef != null) {
            externalReferences.push(externalRef)
        }
    }
    return externalReferences
}

