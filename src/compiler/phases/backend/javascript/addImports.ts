import { Declaration } from "../../../ast/Declaration";
import { Reference } from "../../../ast/Reference";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

export function addImports(moduleName, module, externals): ReturnType<Phase> {
    let debug = moduleName === "test.sample";
    let importPaths = new Set<string>();
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Reference) {
                    let d: Declaration | null = c.getDeclaration(node);
                    let external = d?.location.filename !== moduleName;
                    if (external) {
                        if (debug) {
                            importPaths.add(node.name);
                        }
                    }
                }
                return node;
            }
        }
    })
    if (importPaths.size > 0) {
        console.log("import paths", importPaths);
    }
    return [module, []];
}
