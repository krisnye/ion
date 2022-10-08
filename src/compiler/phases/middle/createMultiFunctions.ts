import { LogicalOperators } from "../../analysis/LogicalOperators";
import { joinExpressions } from "../../analysis/utility";
import { BinaryExpression } from "../../ast/BinaryExpression";
import { Block } from "../../ast/Block";
import { Call } from "../../ast/Call";
import { Conditional } from "../../ast/Conditional";
import { Declaration } from "../../ast/Declaration";
import { Declarator } from "../../ast/Declarator";
import { Function } from "../../ast/Function";
import { FunctionDeclaration } from "../../ast/FunctionDeclaration";
import { Reference } from "../../ast/Reference";
import { Return } from "../../ast/Return";
import { Variable } from "../../ast/Variable";
import { Node } from "../../Node";
import { getAbsolutePath } from "../../pathFunctions";
import { SourceLocation } from "../../SourceLocation";
import { SourcePosition } from "../../SourcePosition";
import { sortDeclarations } from "../frontend/createScopeMaps";
import { isInferFunction } from "../frontend/typeInference";
import { Phase } from "../Phase";

export function createMultiFunctions(moduleName, module, externals): ReturnType<Phase> {
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
    let newNodes = new Array<Declaration>();
    let changes = new Map<Node,Node>();
    for (let [name, functions] of allFunctionDeclarations) {
        //  first sort functions
        sortDeclarations(functions);
        //  rename child functions.
        for (let func of functions) {
            changes.set(
                func,
                new Variable({
                    // change the filename to the new global multifunction file
                    location: func.location,
                    id: func.id.patch({
                        name: getOrderedName(func)
                    }),
                    value: new Function({
                        meta: func.meta,
                        location: func.location,
                        parameters: func.parameters,
                        body: func.body,
                        returnType: func.returnType,
                        id: func.id.patch({
                            name: getOrderedName(func)
                        })
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

        let multiFunctionId = new Declarator({ name, location });
        let multiFunctionDeclaration: Declaration;
        if (functions.length === 1) {
            multiFunctionDeclaration = functions[0].patch({
                id: multiFunctionId
            });
        }
        else {
            let parameters = functions
                .map(func => func.parameters)
                .sort((a, b) => b.length - a.length)[0]
                .map(p => p.patch({ location, type: null, declaredType: null }));
            
            let functionChecks = functions.map(func => {
                let checks = func.parameters.map(
                    param => {
                        // should we call dot expression yet?
                        let left = new Reference(param.id);
                        let right = param.declaredType ?? param.type!;
                        return new BinaryExpression({
                            location, left, operator: LogicalOperators.is, right,
                        });
                    }
                );
                let returnStatement = new Return({
                    location,
                    value: new Call({
                        location,
                        // need to use the actual file name.
                        callee: new Reference({ location, name: getOrderedName(func) }),
                        nodes: func.parameters.map(p => new Reference(p.id))
                    })
                });
                let test = joinExpressions(LogicalOperators.and, location, checks, true);
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

            multiFunctionDeclaration = new Variable({
                location,
                id: multiFunctionId,
                value: new Function({
                    location,
                    id: multiFunctionId,
                    body: new Block({
                        location,
                        nodes: functionChecks
                    }),
                    parameters,
                    returnType: null,
                    meta: [],
                    multiFunctions: functions.map(getOrderedName).map(name => new Reference({ location, name }))
                })
    
            })
        }

        newNodes.push(multiFunctionDeclaration);

    }

    let nodes = [...(module.nodes as Declaration[]).map(node => {
        return (changes.get(node) ?? node) as Declaration;
    }).filter(node => {
        return node.id.name !== moduleName;
    }), ...newNodes];

    //  now remove duplicate identifiers as the first if present is just an extraneous export.
    //  this won't happen after re-factoring, right now it's a hack because we create a default export
    //  and now in root multi function modules we create a new multifunction with same name.
//    nodes = [...new Map(nodes.map(node => [node.id.name, node])).values()];
    nodes = nodes.filter(node => !(node instanceof Variable && node.value instanceof Reference && node.id.name === node.value.name));

    module = module.patch({
        nodes
    });

    return [module, []];
}

function getOrderedName(d: Declaration) {
    return d.order == null ? d.id.name : `${d.id.name}_${d.order}`;
}