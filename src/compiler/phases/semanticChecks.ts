import { traverse, skip, replace, Lookup } from "@glas/traverse";
import combineExpressions from "../analysis/combineExpressions";
import { binaryOps, unaryOps } from "../analysis/evaluate";
import { isSubtype } from "../analysis/newTypeAnalysis";
import { combineNumberTypes, numberType, isLiteralNumberType } from "../analysis/numberTypes";
import splitExpressions from "../analysis/splitExpressions";
import { Assignment, BinaryExpression, Call, ClassDeclaration, Type, Expression, ExpressionStatement, FunctionExpression, Identifier, Literal, Module, ObjectExpression, Position, Reference, Variable, Property, MemberExpression, ArrayExpression, Declarator, Node, Block, Conditional, OutlineOperation, Declaration, For, SideEffect, UnaryExpression, NumberType, IntersectionType, ObjectType, ArrayPattern, PatternProperty, RestElement, ObjectPattern } from "../ast";
import { hasNodesOfType, SemanticError, isTypeName, isMetaName } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import { getLast } from "../pathFunctions";
import { _this } from "../reservedWords";
import toCodeString from "../toCodeString";
import * as types from "../types";

// function toCheck(node: Expression, operator = "is") {
//     let { location } = node
//     return new BinaryExpression({
//         location,
//         left: new DotExpression({ location }),
//         operator,
//         right: node
//     })
// }

// function hasDot(node: Expression) {
//     return hasNodesOfType(node, DotExpression.is)
// }

export function getFinalExpressions(node: Node, expressions: Set<Expression> = new Set()) {
    if (Block.is(node)) {
        // // check that this is the only expression statement
        // for (let i = 0; i < node.body.length - 1; i++) {
        //     let statement = node.body[i]
        //     if (ExpressionStatement.is(statement)) {
        //         throw SemanticError("Only the final statement can be an expression", statement)
        //     }
        // }
        getFinalExpressions(node.body[node.body.length - 1], expressions)
    }
    else if (Conditional.is(node)) {
        getFinalExpressions(node.consequent, expressions)
        if (node.alternate) {
            getFinalExpressions(node.alternate, expressions)
        }
    }
    else if (Expression.is(node)) {
        expressions.add(node)
    }
    else {
        throw SemanticError(`Final node must be an expression`, node)
    }
    return expressions
}

function replaceOutlineOperations(e: Expression, lookup: Lookup) {
    return traverse(e, {
        lookup,
        leave(node) {
            if (OutlineOperation.is(node)) {
                return combineExpressions(
                    node.body.map(value => {
                        if (Expression.is(value)) {
                            return value
                        }
                        else {
                            throw SemanticError(`Invalid in Type declarations`, value)
                        }
                    }),
                    node.operator
                )
            }
        }
    })
}

function setTypeToVoidRecursive(node, errors: Error[], isFinal: boolean) {
    if (Block.is(node)) {
        let body = node.body.map((child, index) => {
            let final = isFinal && index + 1 == node.body.length
            // if (!final && !SideEffect.is(child)) {
            //     // if a statement isn't final then it must be a declaration or an assignment
            //     errors.push(SemanticError(`Expression has no effect`, child))
            // }
            return setTypeToVoidRecursive(child, errors, final)
        })
        return node.patch({ body, type: isFinal ? node.type : types.Void })
    }
    if (Conditional.is(node)) {
        let consequent = setTypeToVoidRecursive(node.consequent, errors, isFinal)
        let alternate = setTypeToVoidRecursive(node.alternate, errors, isFinal)
        if (consequent !== node.alternate || alternate !== node.alternate) {
            return node.patch({ consequent, alternate, type: isFinal ? node.type : types.Void })
        }
    }
    if (For.is(node)) {
        return node.patch({ body: setTypeToVoidRecursive(node.body, errors, isFinal), type: isFinal ? node.type : types.Void })
    }
    return node
}

export default function semanticChecks(
    module: Module,
    options: Options
): Module | Error[] {
    let errors = new Array<Error>()
    // we only create the scope map to check for redeclaration errors
    let lookup = new Lookup()
    let scopes = createScopeMaps(
        module, {
            lookup,
            callback(current, previous) {
                // only parameters (FunctionExpression source) are allowed to redeclare variable names
                let gparent = lookup.getAncestor(current, 2)
                if (previous != null && !FunctionExpression.is(gparent)) {
                    // console.log({ current: current.location, source: source.location, previous: previous.location })
                    debugger
                    errors.push(SemanticError(`Cannot redeclare ${current.name}`, current))
                }
            }
        }
    )
    // check that there is only a single final expression statement
    let last = getLast(module.name)
    let index = 0
    module = traverse(module, {
        lookup,
        enter(node, ancestors) {
            if (Position.is(node)) {
                return skip
            }
        },
        leave(node, ancestors, path) {
            // if (TypeExpression.is(node)) {
            //     node = checkTypeExpression(node, errors, lookup, true)
            // }
            if (BinaryExpression.is(node) || OutlineOperation.is(node)) {
                let func = binaryOps[node.operator]
                if (func === undefined || typeof func === "string") {
                    errors.push(SemanticError(
                        `Unsupported binary operator (${node.operator})` + (func ? `, use ${func} instead.` : ``),
                        node
                    ))
                }
            }
            if (ObjectType.is(node)) {
                let types = node.properties.filter(Type.is)
                if (types.length > 0) {
                    if (node.kind !== "Array") {
                        errors.push(SemanticError(`Implicit index constraints only valid on Array Type declarations`, types[0]))
                    }
                    // check that the types all come first.
                    let foundNonType: Property | null = null
                    for (let property of node.properties) {
                        if (Property.is(property)) {
                            foundNonType = property
                        }
                        else if (foundNonType && Type.is(property)) {
                            errors.push(SemanticError(`Property constraints must come after all implicit index constraints`, foundNonType))
                            // we don't need to throw an error for all
                            break
                        }
                    }
                    node = node.patch({
                        properties: [
                            ...types.map((type, index) => new Property({ key: numberType(index), value: type })),
                            ...node.properties.filter(type => !Type.is(type))
                        ]
                    })
                }
            }
            if (ArrayPattern.is(node)) {
                // convert to an ObjectPattern
                let properties = new Array<PatternProperty | RestElement>()
                let index = 0
                for (let item of node.elements) {
                    if (RestElement.is(item)) {
                        properties.push(item)
                    }
                    else if (Expression.is(item)) {
                        properties.push(
                            new PatternProperty({
                                location: item.location,
                                key: new Literal({ value: index }),
                                id: item
                            })
                        )
                    }
                    index++
                }
                return new ObjectPattern({ location: node.location, kind: "Array", properties })
            }
            if (IntersectionType.is(node)) {
                let { types } = node
                // check for mutual incompatibility
                for (let i = 0; i < types.length; i++) {
                    let a = types[i]
                    for (let k = i + 1; k < types.length; k++) {
                        let b = types[k]
                        // check that clause a and b are compatible.
                        let resultab = isSubtype(a, b)
                        // should only have to check one direction.
                        if (resultab === false) {
                            errors.push(SemanticError(`Types are incompatible`, a, b))
                            break
                        }
                        if (resultab === true) {
                            errors.push(SemanticError(`Second type is redundant`, a, b))
                            break
                        }
                        let resultba = isSubtype(b, a)
                        // should only have to check one direction.
                        if (resultba === false) {
                            errors.push(SemanticError(`Types are incompatible (this shouldn't be possible)`, a, b))
                            break
                        }
                        if (resultba === true) {
                            errors.push(SemanticError(`First type is redundant`, a, b))
                            break
                        }
                    }
                }
                // combine NumberTypes > 1
                let numberTypes = types.filter(isLiteralNumberType)
                if (numberTypes.length > 1) {
                    node = node.patch({
                        types: [...types.filter(value => !isLiteralNumberType(value)), combineNumberTypes(numberTypes)!]
                    })
                }
            }
            if (UnaryExpression.is(node)) {
                if (unaryOps[node.operator] == null) {
                    errors.push(SemanticError(`Unsupported unary operator ${node.operator}`, node))
                }
            }
            if (Variable.is(node)) {
                var container = ancestors[ancestors.length - 1]
                var ancestor = ancestors[ancestors.length - 2]
                var parentClass = ClassDeclaration.is(ancestor) ? ancestor : null
                if (parentClass) {
                    node = node.patch(node.type ? { isInstance: true } : { isStatic: true })
                }
                if (Declarator.is(node.id)) {
                    if (isMetaName(node.id.name)) {
                        node = node.patch({ isMeta: true })
                    }
                    else if (isTypeName(node.id.name)) {
                        // if it's a type it has no value, the value is moved to the .type property
                        node = node.patch({ isType: true })
                        // check type
                        if (node.type == null) {
                            errors.push(SemanticError(`Type declarations must have a type`, node))
                        }
                        if (node.value != null) {
                            errors.push(SemanticError(`Type declarations must not have a value`, node))
                        }
                        // else if (TypeExpression.is(node.value)) {
                        //     node = node.patch({
                        //         value: checkTypeExpression(node.value, errors, lookup)
                        //     })
                        // }
                    }
                }
            }

            // if (DotExpression.is(node)) {
            //     errors.push(SemanticError(`Dot expressions are only valid within Type expressions`, node))
            // }

            let isRootStatement = module.body == ancestors[ancestors.length - 1]
            if (isRootStatement) {
                let isExpression = ExpressionStatement.is(node) || Expression.is(node)
                // node might have been patched
                let isFinalStatement = module.body.length == ++index
                let isVariableWithSameNameAsModule = Variable.is(node) && Identifier.is(node.id) && node.id.name == module.name
                if (isVariableWithSameNameAsModule && !isFinalStatement) {
                    errors.push(SemanticError(`Variable with same name as module must be final statement`, node))
                }
                if (!Declaration.is(node) && !isFinalStatement) {
                    errors.push(SemanticError(`Only a single final exported expression is allowed in a module`, node))
                }
                if (Variable.is(node) && node.value == null) {
                    //  This MAY be allowed, IF your declaration is a meta variable
                    //  We'll have to check later.
                    // errors.push(SemanticError(`Module scoped variables are not allowed`, node))
                }
                if (Assignment.is(node)) {
                    errors.push(SemanticError(`Assignment statements are not allowed in the module scope`, node))
                }
                if (ClassDeclaration.is(node)) {
                    if (!isTypeName(node.id.name)) {
                        errors.push(SemanticError(`Class names start with an upper case letter`, node))
                    }
                }
                if (isFinalStatement) {
                    if (ExpressionStatement.is(node)) {
                        let {value} = node
                        if (FunctionExpression.is(value)) {
                            let name = value.id?.name
                            if (name == null || name != last) {
                                errors.push(SemanticError(`A final export function expression must have a name matching the file (${last})`, value.id || value))
                            }
                        }
                    }

                    if (!isExpression) {
                        errors.push(SemanticError(`Final statement must be an expression`, node))
                    }
                    else {
                        if (ExpressionStatement.is(node)) {
                            node = node.value
                        }
                        node = new Variable({ id: new Declarator({ location: node.location, name: "export" }), value: node })
                    }
                }
            }
            if (FunctionExpression.is(node)) {
                let parent = lookup.getAncestor(node, 1)
                let gparent = lookup.getAncestor(node, 3)
                if (Variable.is(parent)) {
                    // name the function expression for the variable.
                    if (ClassDeclaration.is(gparent)) {
                        // check that no 'this' parameters are explicitly declared
                        for (let param of node.parameters) {
                            if (Declarator.is(param.id) && param.id.name === _this) {
                                errors.push(SemanticError(`Cannot explicitly declare 'this' parameter on a class function`, param.id))
                            }
                        }
                        node = node.patch({
                            // insert implicit 'this' parameter
                            parameters: [new Variable({ id: new Declarator({ name: _this }), type: new Reference({ name: gparent.id.name })}), ...node.parameters],
                            // add implicit 'this' to local references to class variables
                            body: traverse(node.body, {
                                lookup,
                                leave(node) {
                                    if (Reference.is(node)) {
                                        // check against scope
                                        let scope = scopes.get(node)
                                        let declaration = lookup.getCurrent(scope[node.name])
                                        if (Variable.is(declaration) && declaration.isInstance) {
                                            return new MemberExpression({
                                                object: new Reference({ name: _this }),
                                                property: new Identifier(node)
                                            })
                                        }
                                    }
                                }
                            })
                        })
                    }
                    // rename anonymous functions to the name of their variable
                    if (node.id == null) {
                        node = node.patch({ id: parent.id }) as FunctionExpression
                    }
                }
                // now any For/Block/Conditional is type void. if it's not the final expression.
                node = node.patch({ body: setTypeToVoidRecursive(node.body, errors, true) })
            }
            return node
        }
    })
    return errors.length ? errors : module
}