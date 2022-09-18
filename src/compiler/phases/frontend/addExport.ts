import { Declaration, isDeclaration } from "../../ast/Declaration"
import { Declarator } from "../../ast/Declarator"
import { Expression } from "../../ast/Expression"
import { Module } from "../../ast/Module"
import { ObjectExpression } from "../../ast/ObjectExpression"
import { Reference } from "../../ast/Reference"
import { Variable } from "../../ast/Variable"
import { defaultExportName, getLastName } from "../../pathFunctions"
import { SourceLocation } from "../../SourceLocation"
import { isPrivateName } from "../../utility"
import { Phase } from "../Phase"

export function createExportObject(location: SourceLocation, declarations: Declaration[]) {
    return new ObjectExpression({
        location,
        nodes: declarations.filter(d => d instanceof Variable && !isPrivateName(d.id.name))
            .map(d => new Variable({ location: d.location, id: new Declarator(d.id), value: new Reference(d.id), kind: "property"}))
    });
}

export default function addExport(moduleName, module: Module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    let exportValue: Expression;
    let declarations = module.nodes.filter(isDeclaration);
    let sameNamedValue = declarations.find(d => getLastName(moduleName) === getLastName(d.id.name));
    if (sameNamedValue) {
        exportValue = new Reference(sameNamedValue.id);
    }
    else {
        exportValue = createExportObject(module.location, declarations);
    }
    // let DEBUG = moduleName === "test.sample";
    // if (DEBUG) {
    //     console.log("RUNNING THIS addExport");
    // }
    //  don't add a default export if the sameNamedValue is in the root namespace.
    module = module.patch({
        nodes: [
            ...module.nodes,
            new Variable({
                location: module.location,
                constant: true,
                id: new Declarator({ location: module.location, name: defaultExportName }),
                value: exportValue
            })
        ]
    });
    return [module, errors];
}
