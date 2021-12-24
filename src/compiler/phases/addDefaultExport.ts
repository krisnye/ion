import { traverse } from "@glas/traverse";
import { Declaration, Declarator, Module, Variable } from "../ast";
import { Options } from "../Compiler"
import { getLastName } from "../pathFunctions";

export default function addDefaultExport(
    module: Module,
) {
    let lastName = getLastName(module.name)
    let last = module.body[module.body.length - 1]
    let {location} = last
    if (!Declaration.is(last)) {
        module = module.patch({
            body: Object.assign(
                [...module.body],
                { [module.body.length - 1]: new Variable({
                    location,
                    id: new Declarator({ location, name: lastName}),
                    value: last,
                }) }
            )
        })
    }

    return module
}
