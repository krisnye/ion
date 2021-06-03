import { Options } from "../Compiler";
import Analysis from "../ast/Analysis";
import { getTypeCheckFunctionName } from "../common";
import ClassDeclaration from "../ast/ClassDeclaration";
import VariableDeclaration from "../ast/VariableDeclaration";
import Id from "../ast/Id";
import FunctionExpression from "../ast/FunctionExpression";
import Reference from "../ast/Reference";
import Parameter from "../ast/Parameter";
import BlockStatement from "../ast/BlockStatement";
import ReturnStatement from "../ast/ReturnStatement";
import CallExpression from "../ast/CallExpression";
import Declaration from "../ast/Declaration";
import { Property, BinaryExpression } from "../ast";

export default function createClassTypeChecks(root: Analysis, options: Options) {

    let newDeclarations = new Array<Declaration>()

    for (let name of root.declarations.keys()) {
        let declaration = root.declarations.get(name)
        if (ClassDeclaration.is(declaration)) {
            let isTypeName = getTypeCheckFunctionName(name)
            // add a private variable holding the implementations.
            newDeclarations.push(
                new VariableDeclaration({
                    location: declaration.location,
                    id: new Id({ name: isTypeName }),
                    export: declaration.export,
                    value: new FunctionExpression({
                        typeGuard: new Reference({ name: name }),
                        parameters: [new Parameter({
                            id: new Id({ name: "value" })
                        })],
                        body: new BlockStatement({
                            statements: [
                                new ReturnStatement({
                                    value: new CallExpression({
                                        callee: new Reference({ name: "ion.Class:isInstance" }),
                                        arguments: [
                                            new Property({ value: new Reference({ name: name }) }),
                                            new Property({ value: new Reference({ name: "value" }) })
                                        ]
                                    })
                                })
                            ]
                        })
                    }),
                    assignable: false,
                })
            )
        }

    }

    let declarations = new Map(root.declarations.entries())
    for (let declaration of newDeclarations) {
        declarations.set(declaration.id.name, declaration)
    }

    return root.patch({ declarations })

}