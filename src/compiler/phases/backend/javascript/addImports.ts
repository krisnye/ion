import { Declaration } from "../../../ast/Declaration";
import { ESNode } from "../../../ast/ESNode";
import { Expression } from "../../../ast/Expression";
import { Module } from "../../../ast/Module";
import { Reference } from "../../../ast/Reference";
import { join, split } from "../../../pathFunctions";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

function createJavascriptImports(moduleName: string, importPaths: Set<string>, externals: Map<string,any>): ESNode[] {
    function findFile(name: string): [string,string] {
        let steps = split(name);
        let exportName = steps[steps.length - 1];
        let filename: string;
        if (externals.has(name)) {
            filename = name;
        }
        else {
            filename = join(...steps.slice(0, -1));
        }
        return [filename, exportName];
    }

    let importPairs = [...importPaths].map(findFile);

    let filenameToImports: Map<string,Set<string>> = new Map([...new Set(importPairs.map(pair => pair[0]))].map(filename => [filename, new Set()]));
    for (let [filename, exportName] of importPairs) {
        filenameToImports.get(filename)!.add(exportName);
    }

    // const DEBUG = moduleName === "test.sample";
    // if (DEBUG) {
    //     console.log("STUFF GOES HERE: ", moduleName, filenameToImports);
    // }
    let sourceModuleDepth = split(moduleName).length - 1;
    let pathFromSourceModuleToRoot = sourceModuleDepth === 0 ? "./" : new Array(sourceModuleDepth).fill("../").join("");

    return [...filenameToImports.entries()].map(([filename, exportNames]) => {
        return new ESNode({
            type: "ImportDeclaration",
            specifiers: [...exportNames].map(exportName => ({
                type: "ImportSpecifier",
                local: { type: "Identifier", name: exportName },
                imported: { type: "Identifier", name: exportName },
            })),
            source: {
                type: "Literal",
                value: pathFromSourceModuleToRoot + filename
            }
        });
    })
}

export function addImports(moduleName, module: Module, externals): ReturnType<Phase> {
    let importPaths = new Set<string>();
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Reference) {
                    let d: Declaration | null = c.getDeclaration(node);
                    let external = d?.location.filename !== moduleName;
                    if (external) {
                        importPaths.add(node.name);
                    }
                }
                return node;
            }
        }
    })
    if (importPaths.size > 0) {
        // OK, then let's add some import nodes.
        let imports = createJavascriptImports(moduleName, importPaths, externals);
        module = module.patch({
            nodes: [...imports as Expression[], ...module.nodes]
        });
        // console.log(`${moduleName} import paths`, importPaths, "imports", imports);
    }
    return [module, []];
}
