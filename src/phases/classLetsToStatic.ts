import { traverse, skip } from "../Traversal";
import { Assembly, ClassDeclaration, Declaration, Module, FunctionExpression, VariableDeclaration, BlockStatement, ReturnStatement, ThisExpression, Property, Id, Parameter, Reference, MemberExpression, Expression } from "../ast";
import { SemanticError } from "../common";

function convertToStatic(declaration: Declaration): declaration is VariableDeclaration & { value: Expression } {
    return !declaration.assignable && VariableDeclaration.is(declaration) && declaration.value != null
}

export default function classLetsToStatic(root: Assembly) {
    return traverse(root, {
        leave(node) {
            if (Module.is(node)) {
                const newStaticDeclarations = new Array<Declaration>()
                for (const moduleDeclaration of node.declarations) {
                    if (ClassDeclaration.is(moduleDeclaration)) {
                        for (const name of moduleDeclaration.declarations.keys()) {
                            const declaration = moduleDeclaration.declarations.get(name)!
                            if (convertToStatic(declaration)) {
                                const value = declaration.value
                                const { location } = value
                                let newFunction: FunctionExpression
                                if (FunctionExpression.is(value)) {
                                    throw SemanticError("Not implemented yet", value)
                                }
                                else {
                                    newFunction = new FunctionExpression({
                                        location,
                                        id: declaration.id,
                                        parameters: [
                                            new Parameter({
                                                id: new Id({ name: "this" }),
                                                type: new Reference(moduleDeclaration.id)
                                            })
                                        ],
                                        body: new BlockStatement({
                                            location,
                                            statements: [
                                                new ReturnStatement({
                                                    location,
                                                    value: traverse(value, {
                                                        leave(node) {
                                                            if (Reference.is(node) && moduleDeclaration.declarations.has(node.name)) {
                                                                const { location } = node
                                                                return new MemberExpression({
                                                                    location,
                                                                    object: new Reference({ location, name: 'this' }),
                                                                    property: new Id( node )
                                                                })
                                                            }
                                                        }
                                                    })
                                                })
                                            ]
                                        })
                                    })
                                }

                                newStaticDeclarations.push(
                                    new VariableDeclaration({
                                        id: declaration.id,
                                        value: newFunction
                                    })
                                )
                            }
                        }
                    }
                }
                return traverse(node.patch({
                    declarations: [...node.declarations, ...newStaticDeclarations]
                }), {
                    enter(node) {
                        if (Declaration.is(node)) {
                            if (!ClassDeclaration.is(node)) {
                                return skip
                            }
                        }
                    },
                    leave(node) {
                        if (Declaration.is(node)) {
                            if (ClassDeclaration.is(node)) {
                                return node.patch({
                                    declarations: new Map(
                                        Array.from(node.declarations.entries()).filter(
                                            ([name, value]) => !convertToStatic(value)
                                        )
                                    )
                                })
                            }
                        }
                    }
                })
            }
        }
    })
}
