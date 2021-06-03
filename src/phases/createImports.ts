import Assembly from "../ast/Assembly";
import { traverse, skip } from "../Traversal";
import { getExternalModuleNameAndExportName, getLastName } from "../common";
import IdGenerator from "../IdGenerator";
import Reference from "../ast/Reference";
import MemberExpression from "../ast/MemberExpression";
import Id from "../ast/Id";
import Declaration from "../ast/Declaration";
import ImportDeclaration from "../ast/ImportDeclaration";
import Module from "../ast/Module";
import Expression from "../ast/Expression";

export default function createImports(root: Assembly) {

    return traverse(root, {
        enter(node) {
            if (Module.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (Module.is(node)) {
                // external module name => Reference => local name
                let externalReferences = new Map<string,Map<Reference,string>>()
                // valid identifiers, so we don't generate a collision
                let idGenerator = new IdGenerator()

                traverse(node, {
                    enter(node) {
                        if (Reference.is(node)) {
                            return skip
                        }
                    },
                    leave(node) {
                        if (Reference.is(node)) {
                            let externalModuleAndName = getExternalModuleNameAndExportName(node.name)
                            if (externalModuleAndName) {
                                let [moduleName, exportName] = externalModuleAndName
                                let refs = externalReferences.get(moduleName)
                                if (refs == null) {
                                    externalReferences.set(moduleName, refs = new Map())
                                }
                                // save this so we can fix it later
                                refs.set(node, exportName)
                            }
                            else {
                                idGenerator.ids.add(node.name)
                            }
                        }
                    }
                })

                // now, create imports and change the references.
                let newImports: Declaration[] = []
                let replace = new Map<Reference,Expression>()
                for (let externalModuleName of externalReferences.keys()) {
                    let localName = idGenerator.createNewIdName(getLastName(externalModuleName))
                    newImports.push(
                        new ImportDeclaration({
                            id: new Id({
                                name: localName
                            }),
                            from: externalModuleName
                        })
                    )
                    // now fix all of the current references
                    let refs = externalReferences.get(externalModuleName)!
                    for (let ref of refs.keys()) {
                        let exportName = refs.get(ref)!
                        replace.set(ref, 
                            new MemberExpression({
                                object: ref.patch({ name: localName }),
                                property: new Id({ name: exportName })
                            })
                        )
                    }
                }
                return new Module({
                    declarations: [
                        ...newImports,
                        ...traverse(node.declarations, {
                            leave(node) {
                                return replace.get(node) ?? node
                            }
                        })
                    ]
                })
            }
        }
    })

}
