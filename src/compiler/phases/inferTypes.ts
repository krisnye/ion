import { Lookup, traverse } from "@glas/traverse";
import evaluate from "../analysis/evaluate";
import getSortedExpressions from "../analysis/getSortedExpressions";
import { Expression, Literal, Module, TypeExpression } from "../ast";
import * as ast from "../ast";
import { SemanticError } from "../common";
import { Options } from "../Compiler"
import createScopeMaps, { createGlobalScope } from "../createScopeMaps";
import * as types from "../types"
import EvaluateContext from "../analysis/EvaluateContext";
import toCodeString from "../toCodeString";
import isConsequent from "../analysis/isConsequent";
import negate from "../analysis/negate";
import simplify from "../analysis/simplify";
import { getFinalExpressions } from "./semanticChecks";
import combineExpressions from "../analysis/combineExpressions";
import { inferOperationType } from "../analysis/numberTypes";

function setResolved(lookup: Lookup, originalNode: Expression, currentNode: Expression) {
    lookup.setCurrent(originalNode, currentNode)
}

function createCombinedTypeExpression(type: ast.TypeExpression, name: String, knownTrueExpression: ast.Expression | null, location: ast.Location) {
    // now we convert the node assert to a type expression (by replacing variable name references to DotExpressions) so we can combine it.
    let found = 0
    let assertType = knownTrueExpression == null ? null :traverse(knownTrueExpression, {
        leave(node) {
            if (ast.Reference.is(node) && node.name === name) {
                found++
                return new ast.DotExpression({})
            }
        }
    })
    // didn't find any means the expression was irrelevant to the type so we can ignore it
    if (found === 0) {
        return type
    }
    let combinedType = combineExpressions([type, assertType], "&")!
    return simplify(new ast.TypeExpression({ location, value: combinedType }))
}

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

export const inferType: {
    [P in keyof typeof ast]?: (node: InstanceType<typeof ast[P]>, c: EvaluateContext, errors: Error[]) => any
} = {
    Declarator(node, c) {
        let declaration = c.lookup.findAncestor(node, ast.Declaration.is)!
        let type = c.lookup.getCurrent(
            ast.Variable.is(declaration) && declaration.isType ? declaration.value : declaration.type
        )
        return { type }
    },
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
        type = new ast.NumberType({ min: node, max: node })
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
    ReferenceType(node, c) {
        let scope = c.scopes.get(node)
        let declarator = c.lookup.getCurrent(scope[node.name])
        let declaration = c.lookup.findAncestor(declarator, ast.Declaration.is)!
        if (!ast.ClassDeclaration.is(declaration)) {
            return declarator.type
        }
    },
    Reference(node, c) {
        let scope = c.scopes.get(node)
        let declarator = c.lookup.getCurrent(c.lookup.getCurrent(scope[node.name]))
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
        let type = createCombinedTypeExpression(ancestorDeclaration.type, name, assertion, node.location!)
        // console.log({ ancestorDeclarationType: toCodeString(ancestorDeclaration.type), assertion: toCodeString(assertion), type: toCodeString(type) })
        return { type }
    },
    Call(node, c, errors) {
        let callee = c.lookup.getCurrent(node.callee)
        let calleeType = callee.type as ast.FunctionType
        let args = c.lookup.getCurrent(node.arguments)
        let index = 0
        // TODO: There should just be a single Anonymous Object parameter.
        for (let originalArg of args) {
            if (ast.Argument.is(originalArg)) {
                let arg = c.lookup.getCurrent(originalArg) as ast.Argument
                let value = c.lookup.getCurrent(arg.value)
                let valueType = value.type
                let calleeParameter = c.lookup.getCurrent(calleeType.parameters[index])
                let calleeParameterType = calleeParameter.type
                let consequent = isConsequent(valueType, calleeParameterType)
                if (consequent === false) {
                    errors.push(SemanticError(`Argument always invalid: ${toCodeString(valueType)}, expected: ${toCodeString(calleeParameterType)}`, value))
                }
                else if (consequent === null) {
                    errors.push(SemanticError(`Argument may be invalid: ${toCodeString(valueType)}, expected: ${toCodeString(calleeParameterType)}`, value))
                }
            }
            else {
                errors.push(SemanticError(`Non-arguments not supported yet`, originalArg))
            }
            index++
        }
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
            if (func == null) {
                console.log("!!!!!!!! NO FUNCTION: " + currentNode.constructor.name)
            }
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
