import Assembly from "../ast/Assembly";
import { Options } from "../Compiler";
import { traverse, skip } from "../Traversal";
import Reference from "../ast/Reference";
import Module from "../ast/Module";
import { absolute } from "../pathFunctions";

export default function convertRefsToAbsolute(root: Assembly, options: Options) {
    //  First we convert any refences to other declarations within the same module
    //  into absolute references
    return traverse(root, {
        enter(node) {
            if (Module.is(node)) {
                return skip
            }
        },
        leave(node, ancestors, path) {
            if (Module.is(node)) {
                let module = node
                let moduleName = path[path.length - 1]
                let rootModuleNames = new Set(module.declarations.map(d => d.id.name))
                return traverse(module, {
                    leave(node) {
                        if (Reference.is(node)) {
                            // let scope = scopes.get(node)
                            // let isInternal = scope[node.name] != null
                            // ONLY if this is a reference to root identifiers..
                            if (rootModuleNames.has(node.name)) {
                                let newName = absolute(moduleName, node.name)
                                // console.log("CHANGE NAME TO ABSOLUTE::::: ", { moduleName: moduleName, nodeName: node.name, newName })
                                return node.patch({ name: newName })
                            }
                        }
                    }
                })
            }
        }
    })
}