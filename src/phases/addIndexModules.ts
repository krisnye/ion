import Assembly from "../ast/Assembly";
import { traverse, skip } from "../Traversal";
import { Module, VariableDeclaration, Id, Reference, MemberExpression, Property, ObjectExpression } from "../ast";
import {  } from "../common";
import { EmptyLocation } from "../types";
import * as pathFunctions from "../pathFunctions";

export default function addIndexModules(root: Assembly) {
    let rootModuleName = pathFunctions.absolute()
    let moduleNames = new Set<string>([rootModuleName])
    return traverse(root, {
        enter(node) {
            if (Module.is(node)) {
                return skip
            }
        },
        leave(node, ancestors, path) {
            // add default export object for libraries
            if (Module.is(node)) {
                let name = path[path.length - 1]
                let steps = pathFunctions.split(name)
                for (let i = 1; i <= steps.length; i++) {
                    moduleNames.add(pathFunctions.absolute(...steps.slice(0, i)))
                }
            }
            //  add implicit libraries for indexes
            if (Assembly.is(node)) {
                // console.log({ moduleNames })
                let newIndexModules = new Map<string,Module>()
                for (let name of moduleNames) {
                    if (!node.modules.has(name)) {
                        // instead of variable declarations that get bound up into library export later ... =>
                        //  just create the default export object expression.
                        let children = Array.from(moduleNames.keys()).filter(child => pathFunctions.isParent(name, child)).map(name => pathFunctions.absolute(name))
                        // let declarations = children.map(child => {
                        //     return new VariableDeclaration({
                        //         id: new Id({ name: pathFunctions.getLast(child) }),
                        //         value: new Reference({ name: child })
                        //     }) as VariableDeclaration & { value: MemberExpression & { object: Reference } }
                        // })
                        // // console.log(">>>>>>>>>> " + name + " => " + children.join(", "))
                        // newIndexModules.set(name, new Module({
                        //     location: EmptyLocation.patch({ filename: name }),
                        //     imports: [],
                        //     declarations
                        // }))

                        let properties = children.map(
                            child => new Property({
                                key: new Id({ name: pathFunctions.getLastName(child)! }),
                                value: new Reference({ name: child })
                            })
                        )
                        let libraryObject = new ObjectExpression({ properties })
                        let libraryDeclaration = new VariableDeclaration({
                            id: new Id({ name: pathFunctions.getLastName(name) }),
                            value: libraryObject
                        })
                        newIndexModules.set(name, new Module({
                            location: EmptyLocation.patch({ filename: name }),
                            imports: [],
                            declarations: [libraryDeclaration]
                        }))
                    }
                }
                return new Assembly({ modules: new Map([ ...node.modules.entries(), ...newIndexModules ])})
            }
        }
    })
}
