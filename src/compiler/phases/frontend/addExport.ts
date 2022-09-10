import { isDeclaration } from "../../ast/Declaration"
import { Expression } from "../../ast/Expression"
import { Identifier } from "../../ast/Identifier"
import { Module } from "../../ast/Module"
import { ObjectExpression } from "../../ast/ObjectExpression"
import { Reference } from "../../ast/Reference"
import { Variable } from "../../ast/Variable"
import { defaultExportName, getLastName } from "../../pathFunctions"
import { isPrivateName } from "../../utility"
import { Phase } from "../Phase"

export default function addExport(moduleName, module: Module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    let exportValue: Expression;
    let declarations = module.nodes.filter(isDeclaration);
    let sameNamedValue = declarations.find(d => getLastName(moduleName) === getLastName(d.id.name));
    if (sameNamedValue) {
        exportValue = new Reference(sameNamedValue.id);
    }
    else {
        exportValue = new ObjectExpression({
            location: module.location,
            nodes: declarations.filter(d => !isPrivateName(d.id.name) && d instanceof Variable)
                .map(v => v.patch({ id: new Identifier(v.id), value: new Reference(v.id), kind: "property"}))
        })
    }
    module = module.patch({
        nodes: [
            ...module.nodes,
            new Variable({
                location: module.location,
                constant: true,
                id: new Identifier({ location: module.location, name: defaultExportName }),
                value: exportValue
            })
        ]
    });
    return [module, errors];
}
