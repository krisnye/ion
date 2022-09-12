import nodeTest from "node:test";
import { Declaration, isDeclaration } from "../../../ast/Declaration";
import { Identifier } from "../../../ast/Identifier";
import { Module } from "../../../ast/Module";
import { ObjectExpression } from "../../../ast/ObjectExpression";
import { Reference } from "../../../ast/Reference";
import { Variable } from "../../../ast/Variable";
import { defaultExportName } from "../../../pathFunctions";
import { traverse } from "../../../traverse";
import { isPrivateName } from "../../../utility";
import { createExportObject } from "../../frontend/addExport";
import { Phase } from "../../Phase";

//  after we create multifunctions each local function declaration is renamed
//  now we have to update our exports to contain these new named functions
//  since the root multi function will need to use these local exports
export default function updateExport(moduleName, module: Module, externals): ReturnType<Phase> {
    let errors: Error[] = [];
    let exportVariable = module.nodes.find(node => node instanceof Variable && node.id.name === moduleName)!;
    let exports = module.nodes.filter(node => isDeclaration(node) && node !== exportVariable) as Declaration[];
    let newExportVariable = exportVariable.patch({
        value: createExportObject(module.location, exports)
    });
    module = traverse(module, {
        // can skip most.
        leave(node) {
            if (node === exportVariable) {
                node = newExportVariable;
            }
            return node;
        }
    });
    return [module, errors];
}
