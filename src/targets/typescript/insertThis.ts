import Output from "../../ast/Output";
import { Assembly, ClassDeclaration, VariableDeclaration, Declaration, Reference, ThisExpression, MemberExpression, Id } from "../../ast";
import { traverse, skip } from "../../Traversal";

export default function insertThis(root: Assembly) {
    return traverse(root, {
        enter(node) {
            if (Declaration.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (ClassDeclaration.is(node)) {
                let localVariables = new Set(Array.from(node.declarations.values()).filter(VariableDeclaration.is).map(node => node.id.name))
                return traverse(node, {
                    leave(node) {
                        // do we allow overridding values? Not yet, so any reference an be safely replaced.
                        if (Reference.is(node) && localVariables.has(node.name)) {
                            return new MemberExpression({
                                location: node.location,
                                object: new ThisExpression({ location: node.location }),
                                property: new Id(node)
                            })
                        }
                    }
                })
            }
        }
    })
}