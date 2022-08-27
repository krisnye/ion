import { TypeOperators } from "../../analysis/TypeOperators";
import { compareOperators, joinExpressions } from "../../analysis/utility";
import { BinaryExpression } from "../../ast/BinaryExpression";
import { Block } from "../../ast/Block";
import { Call } from "../../ast/Call";
import { Conditional } from "../../ast/Conditional";
import { Declaration } from "../../ast/Declaration";
import { FunctionDeclaration } from "../../ast/FunctionDeclaration";
import { Identifier } from "../../ast/Identifier";
import { Reference } from "../../ast/Reference";
import { Return } from "../../ast/Return";
import { Node } from "../../Node";
import { SourceLocation } from "../../SourceLocation";
import { SourcePosition } from "../../SourcePosition";
import { sortDeclarations } from "../frontend/createScopeMaps";
import { isInferFunction } from "../frontend/typeInference";
import { Phase } from "../Phase";

export function createMultiFunctions(moduleName, module, externals): ReturnType<Phase> {
    console.log("======> createMultiFunctions " + moduleName);
    const allFunctionDeclarations = new Map<string,Array<FunctionDeclaration>>();
    for (let node of module.nodes) {
        if (node instanceof FunctionDeclaration && !isInferFunction(node)) {
            let functionDeclarations = allFunctionDeclarations.get(node.id.name);
            if (functionDeclarations == null) {
                allFunctionDeclarations.set(node.id.name, functionDeclarations = []);
            }
            functionDeclarations.push(node);
        }
    }
    //  foreach
    //      create a new multifunction
    //      rename the child functions
    //      reference the child functions by name
    let newNodes = new Array<Node>();
    let changes = new Map<Node,Node>();
    for (let [name, functions] of allFunctionDeclarations) {
        //  first sort functions
        sortDeclarations(functions);
        //  rename child functions
        for (let func of functions) {
            changes.set(
                func,
                func.patch({
                    id: func.id.patch({
                        name: getOrderedName(func)
                    })
                })
            )
        }
        //  create a new multifunction
        const location = new SourceLocation(
            name,
            new SourcePosition(1, 1),
            new SourcePosition(1, 1),
        );

        let multiFunctionId = new Identifier({ name, location });
        let multiFunctionDeclaration: FunctionDeclaration;
        if (functions.length === 1) {
            multiFunctionDeclaration = functions[0].patch({
                id: multiFunctionId
            });
        }
        else {
            let parameters =
                functions
                    .map(func => func.parameters)
                    .sort((a, b) => a.length - b.length)[0]
                    .map(p => p.patch({ type: null, declaredType: null }));
            
            let functionChecks = functions.map(func => {
                let checks = func.parameters.map(param => new BinaryExpression({
                    location,
                    left: new Reference(param.id),
                    operator: "is",
                    right: param.declaredType ?? param.type!,
                }));
                let returnStatement = new Return({
                    location,
                    value: new Call({
                        location,
                        callee: new Reference({ location, name: getOrderedName(func) }),
                        nodes: func.parameters.map(p => new Reference(p.id))
                    })
                });
                let test = joinExpressions("&&", location, checks, true);
                if (test) {
                    return new Conditional({
                        location,
                        test: test,
                        consequent: new Block({
                            location, 
                            nodes: [
                                returnStatement
                            ]
                        }),
                        alternate: null
                    });
                } else {
                    return returnStatement;
                }
            });

            multiFunctionDeclaration = new FunctionDeclaration({
                location,
                id: multiFunctionId,
                body: new Block({
                    location,
                    nodes: functionChecks
                }),
                parameters,
                returnType: null,
                meta: [],
                multiFunctions: functions.map(getOrderedName)
            })
        }

        newNodes.push(multiFunctionDeclaration);

    }

    module = module.patch({
        nodes: [...module.nodes.map(node => {
            return changes.get(node) ?? node;
        }), ...newNodes]
    });

    return [module, []];
}

function getOrderedName(d: Declaration) {
    return `${d.id.name}_${d.order}`;
}