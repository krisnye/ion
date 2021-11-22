import { Lookup, traverse } from "@glas/traverse";
import evaluate from "../analysis/evaluate";
import getSortedExpressions from "../analysis/getSortedExpressions";
import { Expression, Literal, Module, TypeExpression, Property } from "../ast";
import * as ast from "../ast";
import { getNodesOfType, isTypeName, SemanticError } from "../common";
import { Options } from "../Compiler"
import createScopeMaps, { createGlobalScope } from "../createScopeMaps";
import * as types from "../types"
import EvaluateContext from "../analysis/EvaluateContext";
import toCodeString from "../toCodeString";
import negate from "../analysis/negate";
import simplify from "../analysis/simplify";
import { getFinalExpressions } from "./semanticChecks";
import combineExpressions from "../analysis/combineExpressions";
import { inferOperationType, numberType } from "../analysis/numberTypes";
import { isSubtype } from "../analysis/newTypeAnalysis";
import splitExpressions from "../analysis/splitExpressions";
import { operatorToNumberTypes, reflectOperators } from "../analysis/normalize";
import { getAbsolutePath } from "../pathFunctions";

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

// function callToObjectTypeToProperties(call: ast.Call, c: EvaluateContext, errors: Array<Error>) {
//     let callee = c.lookup.getCurrent(call.callee)
//     let calleeType = callee.type as ast.FunctionType
//     let properties = new Array<ast.Property>()
//     let index = 0
//     for (let arg of call.arguments) {
//         if (ast.Argument.is(arg)) {
//             let currentArg = c.lookup.getCurrent(arg) as ast.Argument
//             let value = c.lookup.getCurrent(currentArg.value)
//             let parameter = c.lookup.getCurrent(calleeType.parameters[index++]) as ast.Variable
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

function getDeclarator(node: ast.Reference, c: EvaluateContext) {
    let scope = c.scopes.get(node)
    let declarator = scope[node.name]
    return declarator
}

function getDeclaration(node: ast.Reference, c: EvaluateContext) {
    let declarator = getDeclarator(node, c)
    let declaration = c.lookup.findAncestor(declarator, ast.Declaration.is)
    return declaration
}

function getAncestorExpressionType(node, c: EvaluateContext) {
    let ancestor = c.lookup.findAncestor(node, ast.Expression.is)!
    // let declaration = c.lookup.findAncestor(node, ast.Declaration.is)!
    // this is not technically correct, we need the type of the parent pattern
    let type = c.lookup.getCurrent(ancestor.type)
    return type
}

function getMemberType(objectType: ast.ObjectType, objectProperty: ast.Expression | ast.Identifier, c: EvaluateContext) {
    for (let property of objectType.properties as Array<Property>) {
        let matches = false
        if (ast.Identifier.is(property.key) && ast.Identifier.is(objectProperty)) {
            matches = property.key.name === objectProperty.name
        }
        else if (Expression.is(property.key) && Expression.is(objectProperty)) {
            matches = toCodeString(property.key) === toCodeString(objectProperty)
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
    console.log("NOT FOUND", JSON.stringify({ objectProperty, objectType }, null, 2))
    throw SemanticError(`Property not found`, objectProperty)
}

export const inferType: {
    [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, c: EvaluateContext, errors: Error[]) => any
} = {
    Declarator(node, c) {
        let type = getAncestorExpressionType(node, c)
        // console.log('!!!!!!! ', node.name, '---', type)
        return { type }
    },
    PatternProperty(node, c) {
        let ancestorType = getAncestorExpressionType(node, c)
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
    BinaryExpression(node, c) {
        let type = binaryOperationsType[node.operator]
        if (type == null) {
            let leftType = c.lookup.getCurrent(node.left).type
            let rightType = c.lookup.getCurrent(node.right).type
            type = inferOperationType(leftType, rightType, node.operator, c)
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
    Parameter(node, c, lookup) {
        return inferType.Variable!(node, c, lookup)
    },
    Variable(node, c) {
        let type = c.lookup.getCurrent(node.type)
        // console.log("Variable------- ", {id: toCodeString(node.id)})
        if (type != null) {
        }
        else if (node.value != null) {
            // get the type from the value
            type = c.lookup.getCurrent(node.value).type
        }
        return { type }
    },
    Block(node, c) {
        let type = c.lookup.getCurrent(node.body[node.body.length - 1]).type
        return { type }
    },
    FunctionExpression(node, c) {
        let parameters = node.parameters.map(p => {
            return c.lookup.getCurrent(p)!.patch({ type: c.lookup.getCurrent(p.type)})
        })
        let returnType = c.lookup.getCurrent(node.returnType)
        let returnTypes = [...getFinalExpressions(node.body)].map(e => c.lookup.getCurrent(e).type)
        if (!returnType) {
            returnType = combineExpressions(returnTypes, "|")
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
        // console.log('-------> ClassDeclaration.type: ' + node.id.name, funcType)
        return { type }
    },
    ReferenceType(node, c, errors) {
        if (node.name === types.Number.name) {
            return numberType(null, null)
        }
        return (inferType.Reference as any)(node, c, errors)
        // let scope = c.scopes.get(node)
        // let declarator = c.lookup.getCurrent(scope[node.name])
        // if (!declarator) {
        //     console.log("Declarator not found: ", node.name)
        //     return
        // }
        // let declaration = c.lookup.findAncestor(declarator, ast.Declaration.is)!
        // if (!ast.ClassDeclaration.is(declaration)) {
        //     return declarator.type
        // }
    },
    Reference(node, c) {
        let scope = c.scopes.get(node)
        let declarator = c.lookup.getCurrent(c.lookup.getCurrent(scope[node.name]))
        if (declarator == null) {
            throw SemanticError(`Reference not found: ${node.name}`, node)
        }
        let type = c.lookup.getCurrent(declarator.type)
        return { type }
    },
    ConditionalDeclaration(node, c) {
        let { name } = node.id
        let containingIf = c.lookup.findAncestor(node, ast.Conditional.is)!
        let containingIfScope = c.scopes.get(containingIf)
        let ancestorDeclaration = c.lookup.getCurrent(containingIfScope[name])
        let assertion = containingIf.test
        if (node.negate) {
            assertion = negate(assertion)
        }
        //  need a function to turn an Expression into a Type
        //  then createCombinedType expression must merge two types
        let type = createCombinedTypeExpression(ancestorDeclaration.type, name, assertion, node.location!)
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
        let type = new ast.ObjectType({
            location: node.location,
            kind: "Array",
            properties: items.map((item, index) => {
                let key = new Literal({ value: index })
                let value = c.lookup.getCurrent(item)
                return new Property({
                    key,
                    value: value.type
                })
            })
        })
        return { type }
    },
    ObjectExpression(node, c) {
        let type = new ast.ObjectType({
            location: node.location,
            kind: "Object",
            properties: node.body.filter(Property.is).map(item => {
                let key = c.lookup.getCurrent(item.key)
                let value = c.lookup.getCurrent(item.value)
                return new Property({
                    key: key.type || key,
                    value: value.type
                })
            })
        })
        return { type }
    },
    MemberExpression(node, c) {
        let objectType = c.lookup.getCurrent(node.object).type as ast.ObjectType
        let property = c.lookup.getCurrent(node.property) as ast.Property
        let type = getMemberType(objectType, property, c)
        return { type }
    },
    Call(node, c, errors) {
        let callee = c.lookup.getCurrent(node.callee)
        let calleeType = callee.type as ast.FunctionType
        if (calleeType == null) {
            errors.push(SemanticError(`Callee type not found`, node.callee))
            return
        }
        let index = 0
        //  TODO: Handle destructured parameter names
        let paramNames = new Map(calleeType.parameters.map((value, index) => [(value.id as ast.Declarator).name, index]))
        // console.log(paramNames)
        let argValues = node.arguments.map(arg => {
            if (ast.Argument.is(arg)) {
                let currentArg = c.lookup.getCurrent(arg) as ast.Argument
                let argValue = c.lookup.getCurrent(currentArg.value)
                return argValue
            }
            else {
                throw SemanticError(`Argument type not supported yet`, arg)
            }
        }) as Array<ast.Expression>

        for (let argValue of argValues) {
            let argType = argValue.type!
            let parameter = c.lookup.getCurrent(calleeType.parameters[index]) as ast.Variable
            let parameterType = parameter.type!
            //  replace any parameter type name references with actual arg values (with types)
            let newParameterType = traverse(parameterType, {
                skip(node) { return ast.Location.is(node) },
                leave(node) {
                    if (ast.Reference.is(node)) {
                        let paramIndex = paramNames.get(node.name)
                        if (paramIndex != null) {
                            let referencedArg = argValues[paramIndex]!
                            // console.log("?? " + toCodeString(parameter.id) + " -> " + toCodeString(referencedArg));
                            return referencedArg
                            // let referencedArgType = argValues[paramIndex].type!
                            // //  replace this reference with the actual current referenced argument type
                            // return referencedArgType
                        }
                        else {
                            if (isTypeName(node.name)) {
                                //  if this is a type reference, we should return the value of the type
                                //  unless this is a class in which case, leave alone
                                let declaration = getDeclaration(node, c)
                                if (ast.ClassDeclaration.is(declaration)) {
                                    return node
                                }
                                if (declaration && declaration.type) {
                                    return declaration.type
                                }

                                throw new Error("Type not found?: " + node.name)
                            }
                            else {
                                let declarator = c.lookup.getCurrent(c.scopes.get(node)[node.name])
                                return declarator.type
                            }
                        }
                    }
                }
            })
            // first check if it's consequent with the new replaced parameter type
            let consequent = isSubtype(argType, newParameterType)
            if (consequent !== true) {
                //  if that doesn't validate it then let's simplify the newParameterType
                let simpleParameterType = simplify(newParameterType)
                console.log(`Replaced ${toCodeString(parameter.id)}: ` + toCodeString(parameterType) + " -> " + toCodeString(newParameterType) + " -> " + toCodeString(simpleParameterType))
                consequent = isSubtype(argType, simpleParameterType)
            }

            // console.log({ argType, parameterType })
            // console.log(`CHECK isSubtype ${toCodeString(argType)} => ${toCodeString(parameterType)} ? ${consequent}`)
            if (consequent === false) {
                errors.push(SemanticError(`Argument always invalid: ${toCodeString(argType)}, expected: ${toCodeString(newParameterType)}`, argValue))
            }
            else if (consequent === null) {
                errors.push(SemanticError(`Argument may be invalid: ${toCodeString(argType)}, expected: ${toCodeString(newParameterType)}`, argValue))
            }
            index++
        }

        let type = calleeType.returnType
        return { type }
    },
}

export default function inferTypes(
    module: Module,
    options: Options
): Module | Error[] {
    let lookup = new Lookup()
    let scopes = createScopeMaps(module, { globalScope: options.globalScope, lookup })
    let sorted = getSortedExpressions(module, scopes, lookup)
    // console.log("==============================================")
    // console.log(sorted.map(e => `${e.constructor.name} => ${toCodeString(e)}`).join("\n"))
    // console.log("==============================================")
    let customConvertedNodes = new Set<Expression>()
    let alreadyResolved = new Set<Expression>()

    let errors: Error[] = []

    function ensureResolved(originalNode: Expression) {
        if (alreadyResolved.has(originalNode)) {
            return
        }
        else {
            alreadyResolved.add(originalNode)
        }

        // let resolved = getResolved(lookup, originalNode)
        let context = { lookup, scopes }
        // first try to simplify
        let currentNode = originalNode
        currentNode = evaluate(currentNode, context)
        lookup.setCurrent(originalNode, currentNode)
        let changes: any = null
        // console.log("--------> " + currentNode.constructor.name + " -> " + toCodeString(currentNode))
        // then try to infer types
        if (currentNode.type == null) {
            let func = inferType[currentNode.constructor.name]
            // if (func == null) {
            //     console.log("!!!!!!!! NO FUNCTION: " + currentNode.constructor.name)
            // }
            changes = func?.(currentNode, context, errors)
        }
        else {
            changes = { type: simplify(currentNode.type) }
        }
        if (changes != null) {
            if (Expression.is(changes)) {
                // we track these so they don't get properties merged later but are returned as is.
                customConvertedNodes.add(changes)
                currentNode = changes
            }
            else {
                currentNode = currentNode.patch(changes)
            }
            lookup.setCurrent(originalNode, currentNode)
        }
        return currentNode
    }

    for (let originalNode of sorted) {
        ensureResolved(originalNode)
    }

    if (errors.length > 0) {
        return errors
    }

    return traverse(module, {
        skip(node) {
            return ast.Position.is(node)
        },
        merge(node, changes, helper) {
            let result = lookup.getCurrent(node)
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

}
