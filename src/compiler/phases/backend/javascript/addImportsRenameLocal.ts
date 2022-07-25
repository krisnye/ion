import { Declaration } from "../../../ast/Declaration";
import { Identifier } from "../../../ast/Identifier";
import { Reference } from "../../../ast/Reference";
import { logOnce } from "../../../utility";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

export function addImportsRenameLocals(moduleName, module, externals): ReturnType<Phase> {
    let debug = moduleName === "test.sample";
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Reference) {
                    let d: Declaration | null = c.getDeclaration(node);
                    if (d?.location.filename !== moduleName) {
                        if (debug) {
                            logOnce("FOUND EXTERNAL: " + node);
                        }
                    }
                }
            }
        }
    })
    return [module, []];
}
