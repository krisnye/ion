import Assembly from "../ast/Assembly";
import { Options } from "../Compiler";
import Analysis from "../ast/Analysis";
import { getAbsoluteName } from "../common";
import Declaration from "../ast/Declaration";
import * as pathFunctions from "../pathFunctions";

export default function assemblyToAnalysis(root: Assembly, options: Options): Analysis {

    //  Then we extract all declarations out
    let declarations = new Map<string, Declaration>()
    for (let moduleName of root.modules.keys()) {
        let module = root.modules.get(moduleName)!
        // move all declarations into the assembly declarations
        for (let declaration of module.declarations) {
            let exportName = pathFunctions.absolute(moduleName, declaration.id.name)
            declarations.set(
                exportName,
                declaration.patch({
                    id: declaration.id.patch({
                        name: exportName
                    })
                })
            )
        }
    }

    //  And finally create the new Analysis scope
    return new Analysis({ declarations })
}