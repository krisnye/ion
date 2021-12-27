import { Lookup, traverse } from "@glas/traverse";
import evaluate from "../analysis/evaluate";
import getSortedExpressions from "../analysis/getSortedExpressions";
import { Expression, Literal, Module, TypeExpression, Property } from "../ast";
import * as ast from "../ast";
import { isMetaName, isTypeName, SemanticError } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import * as types from "../types"
import EvaluateContext from "../analysis/EvaluateContext";
import toCodeString from "../toCodeString";
import negate from "../analysis/negate";
import simplify from "../analysis/simplify";
import { getFinalExpressionsOrReturnValues } from "./semanticChecks";
import combineExpressions from "../analysis/combineExpressions";
import { inferBinaryOperationType, inferUnaryOperationType, numberType } from "../analysis/numberTypes";
import { isSubtype } from "../analysis/newTypeAnalysis";
import splitExpressions from "../analysis/splitExpressions";
import { operatorToNumberTypes, reflectOperators } from "../analysis/normalize";
import { isAbsolutePath } from "../pathFunctions";

function createCombinedTypeExpression(type: ast.TypeExpression, name: String, knownTrueExpression: ast.Expression, location: ast.Location) {
    // now we convert the node assert to a type expression (by replacing variable name references to DotExpressions) so we can combine it.
    let newClauses = new Array<ast.Type>()
    for (let clause of splitExpressions(knownTrueExpression, "&")) {
        if (ast.BinaryExpression.is(clause)) {
            let { left, operator, right } = clause
            // first check if is right side.
            if (ast.Reference.is(right) && right.name === name) {
                // try to swap to left side.
                let reflect = reflectOperators[operator]
                if (reflect == null) {
                    continue
                }
                operator = reflect
                let temp = right
                right = left
                left = temp
            }
            if (operator === "is" || operator === "isnt") {
                if (!ast.ReferenceType.is(right)) {
                    throw SemanticError(`Expected type reference`, right)
                }
                newClauses.push(operator === "isnt" ? new ast.NotType({ value: right }) : right)
            } else {
                if (ast.Reference.is(left) && left.name === name) {
                    newClauses.push(...operatorToNumberTypes[operator](right))
                }
            }
        }
    }
    // didn't find any means the expression was irrelevant to the type so we can ignore it
    if (newClauses.length === 0) {
        return type
    }
    let combinedType = combineExpressions([...(ast.IntersectionType.is(type) ? type.types : [type]), ...newClauses], "&")!
    // console.log("--------> " + toCodeString(combinedType))
    return combinedType
    // return simplify(new ast.TypeExpression({ location, value: combinedType }))
}

function getDeclarator(node: ast.Reference, c: EvaluateContext) {
    let scope = c.scopes.get(node) || c.scopes.get(c.original(node)) || c.scopes.get(null);
    let declarator = scope[node.name];
    return c.current(declarator);
}

function getDeclaration(node: ast.Reference, c: EvaluateContext) {
    let declarator = getDeclarator(node, c)
    if (declarator == null) {
        throw SemanticError(`Reference not found: ${node.name}`, node)
    }
    let declaration = ast.Declaration.is(declarator) ? declarator : c.lookup.findAncestor(declarator, ast.Declaration.is)!
    return c.current(declaration);
}

function getInstanceType(node: ast.ReferenceType, c: EvaluateContext) {
    let declaration = getDeclaration(node, c)
    if (ast.ClassDeclaration.is(declaration)) {
        return declaration.instanceType
    }
    else {
        return declarator.type
    }
}

// function callToObjectTypeToProperties(call: ast.Call, c: EvaluateContext, errors: Array<Error>) {
//     let callee = c.current(call.callee)
//     let calleeType = callee.type as ast.FunctionType
//     let properties = new Array<ast.Property>()
//     let index = 0
//     for (let arg of call.arguments) {
//         if (ast.Argument.is(arg)) {
//             let currentArg = c.current(arg) as ast.Argument
//             let value = c.current(currentArg.value)
//             let parameter = c.current(calleeType.parameters[index++]) as ast.Variable
//             properties.push(new ast.Property({ key: new ast.Identifier(parameter.id as ast.Declarator), value: value.type }))
//         }
//         else {
//             throw SemanticError(`Argument type not supported yet`, arg)
//         }
//     }
//     return properties
// }

const literalTypes = {
    boolean: types.Boolean,
    number: types.Number,
    object: types.Object,
    string: types.String,
}

const unaryOperationsType = {
    "!": types.Boolean,
    "abs": null,
    "inv": null,
}

const binaryOperationsType = {
    "<": types.Boolean,
    ">": types.Boolean,
    "<=": types.Boolean,
    ">=": types.Boolean,
    "==": types.Boolean,
    "!=": types.Boolean,
    "is": types.Boolean,
    // "&": types.Boolean,
    // "|": types.Boolean,
    "^": null,
    "+": null,
    "-": null,
    "*": null,
    "/": null,
    "%": null,
}

function getReferencedValue(node: ast.Reference, c: EvaluateContext): Expression | ast.Declaration | null {
    let declarator = getDeclarator(node, c)
    let declaration = c.lookup.findAncestor(declarator, ast.Declaration.is)
    return declaration
}

function getAncestorExpressionType(node, c: EvaluateContext) {
    let ancestor = c.lookup.findAncestor(node, ast.Expression.is)!
    // let declaration = c.lookup.findAncestor(node, ast.Declaration.is)!
    // this is not technically correct, we need the type of the parent pattern
    let type = c.current(ancestor.type)
    return type
}

function getMemberType(objectType: ast.Type, objectProperty: ast.Expression | ast.Identifier, c: EvaluateContext) {
    if (ast.ReferenceType.is(objectType)) {
        objectType = getInstanceType(objectType, c)
    }
    if (ast.IntersectionType.is(objectType)) {
        objectType = objectType.types.find(ast.ObjectType.is)!
    }
    if (ast.ObjectType.is(objectType)) {
        for (let property of objectType.properties as Array<Property>) {
            let matches = false
            if (ast.Identifier.is(property.id) && ast.Identifier.is(objectProperty)) {
                matches = property.id.name === objectProperty.name
            }
            else if (Expression.is(property.id) && Expression.is(objectProperty)) {
                matches = toCodeString(property.id) === toCodeString(objectProperty)
            }
            else {
                console.log("CHECK TYPES HERE-------")
            }
            // let matches = property.key
            // console.log({ pkey: property.key, np: node.property })
            if (matches) {
                return property.value
            }
        }
    }
    // console.log("NOT FOUND", JSON.stringify({ objectProperty, objectType }, null, 2))
    throw SemanticError(`Property not found`, objectProperty)
}

export const inferType: {
    [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, c: EvaluateContext, errors: Error[]) => any
} = {
    Declarator(node, c) {
        let type = getAncestorExpressionType(node, c)
        // console.log('!!!!!!! ', node.name, '---', toCodeString(type))
        return { type }
    },
    PatternProperty(node, c) {
        let ancestorType = getAncestorExpressionType(node, c) as ast.ObjectType
        let type = getMemberType(ancestorType, node.key, c)
        return { type }
    },
    ObjectPattern(node, c) {
        let type = getAncestorExpressionType(node, c)
        return { type }
    },
    // ArrayPattern(node, c) {
    //     let type = getAncestorExpressionType(node, c)
    //     return { type }
    // },
    UnaryExpression(node, c) {
        let type = unaryOperationsType[node.operator]
        if (type == null) {
            let argumentType = c.current(node.argument).type!
            type = inferUnaryOperationType(argumentType, node.operator, c)
        }
        return { type }
    },
    BinaryExpression(node, c) {
        let type = binaryOperationsType[node.operator]
        if (type == null) {
            let leftType = c.current(node.left).type!
            let rightType = c.current(node.right).type! 
            type = inferBinaryOperationType(leftType, rightType, node.operator, c)
        }
        return { type }
    },
    Literal(node) {
        let jstypeof = typeof node.value
        let type = literalTypes[jstypeof]
        if (type == null) {
            throw SemanticError(`Cannot find type ${jstypeof}`, type)
        }
        if (type === types.Number) {
            type = new ast.NumberType({ min: node, max: node })
        }
        return { type }
    },
    Property(node, c, errors) {
        return inferType.Variable!(node as any, c, errors)
    },
    Parameter(node, c, errors) {
        // if (node.typeParameterIndex != null) {
        //     console.log("!!!!!! Parameter Type " + toCodeString(node.id))
        //     let type = new ast.TemplateType({ typeParameterIndex: node.typeParameterIndex })
        //     return { type }
        // }
        return inferType.Variable!(node, c, errors)
    },
    Variable(node, c, errors) {
        let declaredType = c.current(node.type)
        let valueType: Expression | null = null
        if (node.value != null) {
            // get the type from the value
            valueType = c.current(node.value).type
        }
        if (declaredType != null && valueType != null) {
            // check that value type is assignable to declared type
            let consequent = isSubtype(valueType, declaredType)
            if (consequent === false) {
                errors.push(SemanticError(`Value always invalid: ${toCodeString(valueType)}, expected: ${toCodeString(declaredType)}`, node.value))
            }
            else if (consequent === null) {
                errors.push(SemanticError(`Value may be invalid: ${toCodeString(valueType)}, expected: ${toCodeString(declaredType)}`, node.value))
            }
        }
        return { type: declaredType }
    },
    Module(node, c, e) {
        // same as Block
        return inferType.Block!(node as any, c, e)
    },
    Block(node, c) {
        let type = c.current(node.body[node.body.length - 1]).type
        return { type }
    },
    FunctionExpression(node, c) {
        let parameters = node.parameters.map(p => {
            return c.current(p)!.patch({ type: c.current(p.type)})
        })
        let returnType = c.current(node.returnType)
        let returnTypes = [...getFinalExpressionsOrReturnValues(node.body)].map(e => c.current(e).type!).filter(Boolean)
        if (!returnType) {
            returnType = simplify(combineExpressions(returnTypes, "|"))
            // TODO: Check returnType with actual returnType
        }
        let type = new ast.FunctionType({ parameters, returnType })
        return { type, returnType }
    },
    ClassDeclaration(node, c) {
        // there is the constructor function type AND the static type
        let funcType = new ast.FunctionType({
            location: node.location,
            parameters: node.declarations.filter(d => d.isInstance).map(
                d => new ast.Variable({ location: d.location, id: d.id, type: d.type, value: d.value })
            ),
            returnType: new ast.ReferenceType(node.id),
        })
        let type = funcType
        let instanceType = new ast.ObjectType({
            kind: "Object",
            properties: node.declarations.map(variable => new Property({
                id: variable.id,
                value: variable.type,
            }))
        })
        // now need instanceType
        // console.log('-------> ClassDeclaration.type: ' + node.id.name, funcType)
        return { type, instanceType }
    },
    ReferenceType(node, c, errors) {
        // if (node.name === types.Number.name) {
        //     return numberType(null, null)
        // }
        // // a Reference to Array<T> should yield Function & { static: properties }
        // // a ReferenceType to Array<T> should yield { get(index): T, length: >= 0 }
        // let scope = c.scopes.get(node)
        // let declarator = c.current(c.current(scope[node.name]))
        // if (declarator == null) {
        //     throw SemanticError(`Reference not found: ${node.name}`, node)
        // }
        // let declaration = ast.Declaration.is(declarator) ? declarator : c.lookup.findAncestor(declarator, ast.Declaration.is)!
        // if (ast.ClassDeclaration.is(declaration)) {
        //     return declaration.instanceType
        // }
        // else {
        //     return declarator.type
        // }
        return (inferType.Reference as any)(node, c, errors)
    },
    Reference(node, c, errors) {
        let declarator = getDeclarator(node, c)
        if (declarator == null) {
            throw SemanticError(`Reference not found: ${node.name}`, node)
        }
        let type = c.current(declarator.type)
        if (type == null) {
            let declaration = getDeclaration(node, c)
            // if (ast.Variable.is(declaration) && declaration.typeParameterIndex != null) {
            //     type = new ast.TemplateType({ typeParameterIndex: declaration.typeParameterIndex })
            // }
            if (type == null) {
                debugger
                throw SemanticError(`Can't find type`, declarator)
                // errors.push(SemanticError(`Can't find type`, declarator))
            }
        }
        return { type }
    },
    Conditional(node, c) {
        //  the type of a conditional is typeof consequent | typeof alternate 
        //  actually... the type of a conditional should depend
        //  on whether it's within a vector or scalar context
        let consequentType = c.current(node.consequent).type
        let alternateType = node.alternate ? c.current(node.alternate).type : types.Void

        // console.log("Conditional")
    },
    ConditionalDeclaration(node, c) {
        let { name } = node.id
        let containingIf = c.lookup.findAncestor(node, ast.Conditional.is)!
        let containingIfScope = c.scopes.get(containingIf)
        let ancestorDeclaration = c.current(containingIfScope[name])
        let assertion = containingIf.test
        if (node.negate) {
            assertion = negate(assertion)
        }
        let type = createCombinedTypeExpression(ancestorDeclaration.type as TypeExpression, name, assertion, node.location!)
        let simplified = simplify(type)
        // console.log("ConditionalDeclaration", {
        //     assertion: toCodeString(assertion),
        //     ancestorDeclarationType: toCodeString(ancestorDeclaration.type),
        //     type: toCodeString(type),
        //     simplified: toCodeString(simplified),
        // })
        return { type }
    },
    ArrayExpression(node, c) {
        let items = new Array<Expression>()
        for (let item of node.body) {
            if (Expression.is(item)) {
                items.push(item)
            }
            else {
                // we stop confirming type at first non-expression for now.
                break
            }
        }
        let type = new ast.IntersectionType({
            types: [
                new ast.ReferenceType(types.Array),
                new ast.ObjectType({
                    location: node.location,
                    kind: "Array",
                    properties: [
                        ...items.map((item, index) => {
                            let id = new Literal({ value: index })
                            let value = c.current(item)
                            return new Property({
                                id,
                                value: value.type
                            })
                        }),
                        new Property({
                            id: new ast.Identifier({ name: "length" }),
                            value: new Literal({ value: items.length }),
                        })
                    ]
                }),
            ]
        })

        return { type }
    },
    TemplateType(node) {
    },
    ObjectExpression(node, c) {
        let type = new ast.ObjectType({
            location: node.location,
            kind: "Object",
            properties: node.body.filter(Property.is).map(item => {
                let id = c.current(item.id) as Expression
                let value = c.current(item.value) as Expression
                return new Property({
                    id: ast.Declarator.is(id) ? id : id.type!,
                    value: value.type,
                })
            })
        })
        return { type }
    },
    NumberType(node, c) {
    },
    MemberExpression(node, c) {
        let objectType = c.current(node.object).type!
        let property = c.current(node.property) as ast.Property
        let type = getMemberType(objectType, property, c)
        return { type }
    },
    Call(node, c, errors) {
        let callee = c.current(node.callee)!
        if (callee == null) {
            console.log("______", node)
        }
        let calleeType: Expression | null | undefined = callee.type
        if (calleeType == null) {
            errors.push(SemanticError(`Callee type not found`, node.callee))
            return
        }

        if (ast.IntersectionType.is(calleeType)) {
            calleeType = calleeType.types.find(ast.FunctionType.is)
        }
        if (!ast.FunctionType.is(calleeType)) {
            errors.push(SemanticError(`Callee is not a function`, callee))
            return
        }
        //  TODO: Handle destructured parameter names
        let paramNames = new Map(calleeType.parameters.map((value, index) => [(value.id as ast.Declarator).name, index]))
        // console.log(paramNames)
        let argValues = new Array<ast.Expression>()
        if (node.arguments.length > 0) {
            let index = 0;
            let named = false;
            for (let arg of node.arguments) {
                if (ast.Argument.is(arg)) {
                    let argIndex = index;
                    let currentArg = c.current(arg) as ast.Argument
                    let argValue = c.current(currentArg.value)
                    let name = arg.id?.name ?? null;
                    if (name != null) {
                        named = true;
                        argIndex = paramNames.get(name) ?? -1
                        if (argIndex < 0) {
                            throw SemanticError(`Invalid argument id: ${name}`, arg.id)
                        }
                        if (argValues[argIndex] != null) {
                            throw SemanticError(`Argument value already provided for id: ${name}`, arg.id)
                        }
                    }
                    else if (named) {
                        throw SemanticError(`All arguments after first named argument must have an id`, arg)
                    }
                    argValues[argIndex] = argValue
                }
                else {
                    // function parameter names
                    throw SemanticError(`Argument type not supported yet`, arg)
                }
                index++;
            }
        }
        // now add any missing default values
        for (let index = 0; index < calleeType.parameters.length; index++) {
            let param = calleeType.parameters[index];
            if (argValues[index] == null) {
                // get the default value
                let defaultValue = c.current(param.value);
                if (defaultValue == null) {
                    throw SemanticError(`Missing required parameter "${(param.id as ast.Identifier).name}"`, node)
                }
                else {
                    argValues[index] = defaultValue;
                }
            }
        }

        if (argValues.length > 0) {
            let index = 0;
            for (let argValue of argValues) {
                let argType = argValue.type!
                let parameter = c.current(calleeType.parameters[index]) as ast.Variable
                let parameterType = parameter.type!
                //  replace any parameter type name references with actual arg values (with types)
                let newParameterType = traverse(parameterType, {
                    skip(node) { return ast.Location.is(node) },
                    leave(node) {
                        // CURRENTLY
                        //  This section replaces parameter type references with actual argument values.
                        if (ast.Reference.is(node)) {
                            let paramIndex = paramNames.get(node.name)
                            if (paramIndex != null) {
                                let referencedArg = argValues[paramIndex]!
                                // console.log("?? " + toCodeString(parameter.id) + " -> " + toCodeString(referencedArg));
                                return referencedArg
                            }
                            else {
                                if (isTypeName(node.name)) {
                                    //  if this is a type reference, we should return the value of the type
                                    //  unless this is a class in which case, leave alone
                                    let declaration = getReferencedValue(node, c)
                                    if (ast.ClassDeclaration.is(declaration)) {
                                        return node
                                    }
                                    if (declaration && declaration.type) {
                                        return declaration.type
                                    }

                                    debugger
                                    throw new Error("Type not found: " + node.name)
                                }
                                else {
                                    let declarator = getDeclarator(node, c)
                                    console.log("Declarator", { paramNames, node })
                                    return declarator.type!
                                }
                            }
                        }
                    }
                })
                // if TemplateType, find correct template arg
                if (ast.TemplateType.is(newParameterType)) {
                    // find type arguments
                    let typeArguments: Expression[] | null = null
                    if (ast.Reference.is(node.callee)) {
                        typeArguments = node.callee.typeArguments as any;
                    }
                    if (typeArguments == null) {
                        throw SemanticError(`Missing type arguments`, node.callee)
                    }
                    newParameterType = c.current(typeArguments[newParameterType.typeParameterIndex])
                    if (newParameterType.type != null) {
                        newParameterType = newParameterType.type
                    }
                }
                // first check if it's consequent with the new replaced parameter type
                let consequent = isSubtype(argType, newParameterType)
                if (consequent !== true) {
                    // if that doesn't validate it then let's simplify the newParameterType
                    // first lets traverse and see if we can resolve member expressions
                    let resolvedMemberExpressionTypes = traverse(newParameterType, {
                        leave(node) {
                            if (ast.MemberExpression.is(node)) {
                                let { type } = inferType.MemberExpression!(node, c, errors)
                                //  we only allow this type of simplification
                                //  if the value is a number type with a bounded range
                                //  if not, then this can oversimplify and give a false positive.
                                // if (ast.NumberType.is(type) && type.min != null && type.max != null) {
                                return type
                                // }
                            }
                        }
                    })
                    let simpleParameterType = simplify(resolvedMemberExpressionTypes)
                    // console.log({
                    //     argType: toCodeString(argType),
                    //     newParameterType: toCodeString(newParameterType),
                    //     resolvedMemberExpressionTypes: toCodeString(resolvedMemberExpressionTypes),
                    //     simpleParameterType: toCodeString(simpleParameterType),
                    // })
                    // console.log(`Replaced ${toCodeString(parameter.id)}: ` + toCodeString(parameterType) + " -> " + toCodeString(newParameterType) + " -> " + toCodeString(simpleParameterType))
                    consequent = isSubtype(argType, simpleParameterType)
                }

                // console.log({ argType, parameterType })
                // console.log(`CHECK isSubtype ${toCodeString(argType)} => ${toCodeString(parameterType)} ? ${consequent}`)
                if (consequent === false) {
                    debugger
                    errors.push(SemanticError(`Argument always invalid: ${toCodeString(argType)}, expected: ${toCodeString(newParameterType)}`, argValue))
                }
                else if (consequent === null) {
                    errors.push(SemanticError(`Argument may be invalid: ${toCodeString(argType)}, expected: ${toCodeString(newParameterType)}`, argValue))
                }
                index++
            }
        }

        // if there are more parameters than arg values then we need to check.
        for (let i = argValues.length; i < calleeType.parameters.length; i++) {
            let parameterType = calleeType.parameters[i]
            if (parameterType.value == null) {
                errors.push(SemanticError(`Missing required parameter ${toCodeString(parameterType.id)}`, node))
            }
        }

        return node.patch({
            type: calleeType.returnType,
            arguments: argValues.map((arg, index) => {
                return new ast.Argument({
                    location: arg.location,
                    id: new ast.Declarator((calleeType as ast.FunctionExpression).parameters[index].id as ast.Identifier),
                    value: arg,
                })
            }) as any
        })
    },
}

export default function inferTypes(
    module: Module,
    options: Options,
    dependencies: Map<string,any>,
): Module | Error[] {
    let lookup = new Lookup()
    let scopes = createScopeMaps(module, { lookup, dependencies })
    let context = new EvaluateContext(lookup, scopes)
    let sorted = getSortedExpressions(module, scopes, lookup)
    // console.log("==============================================")
    // console.log(sorted.map(e => `${e.constructor.name} => ${toCodeString(e)}`).join("\n"))
    // console.log("==============================================")
    let customConvertedNodes = new Set<Expression>()
    let alreadyResolved = new Set<Expression>()

    let errors: Error[] = []

    function ensureResolved(originalNode: Expression) {
        //  all previously compiled nodes have .resolved set to true
        //  we check here so that we don't try to re-resolve them
        //  during dependent file compilation
        if (originalNode.resolved || alreadyResolved.has(originalNode)) {
            return
        }
        else {
            alreadyResolved.add(originalNode)
        }

        // let resolved = getResolved(lookup, originalNode)
        // first try to simplify
        let currentNode = originalNode
        currentNode = evaluate(currentNode, context)
        lookup.setCurrent(originalNode, currentNode)
        let changes: any = null
        // console.log("--------> " + currentNode.constructor.name + " -> " + toCodeString(currentNode))
        // then try to infer types
        // if (currentNode.type == null) {
        let func = inferType[currentNode.constructor.name]
        if (func == null) {
            console.log("!!!!!!!! NO FUNCTION: " + currentNode.constructor.name)
        }
        changes = func?.(currentNode, context, errors)
        // }
        // else {
        //     changes = { type: simplify(currentNode.type) }
        // }
        if (changes != null) {
            if (Expression.is(changes)) {
                // we track these so they don't get properties merged later but are returned as is.
                changes = changes.patch({ resolved: true })
                customConvertedNodes.add(changes)
                currentNode = changes
            }
            else {
                if (changes.type) {
                    changes.type = simplify(changes.type)
                }
                currentNode = currentNode.patch({ ...changes, resolved: true })
            }
            lookup.setCurrent(originalNode, currentNode)
        }
        return currentNode
    }

    for (let originalNode of sorted) {
        ensureResolved(originalNode)
    }

    let result = traverse(module, {
        skip(node) {
            return ast.Position.is(node)
        },
        merge(node, changes, helper) {
            let result = context.current(node)
            if (customConvertedNodes.has(result)) {
                return result
            }
            return helper.patch(result, changes)
            // if (result) {
            //     // this doesn't work anymore? why not?
            //     return Expression.is(changes) ? changes : helper.patch(result, changes)
            // }
        }
    })
    return [result, errors]
}
