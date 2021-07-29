import { traverse, skip, replace } from "@glas/traverse";
import combineExpressions from "../analysis/combineExpressions";
import isConsequent from "../analysis/isConsequent";
import splitExpressions from "../analysis/splitExpressions";
import { Assignment, BinaryExpression, Call, ClassDeclaration, DotExpression, Expression, ExpressionStatement, FunctionExpression, Identifier, Literal, Module, ObjectExpression, Position, Reference, TypeExpression, VariableDeclaration, Property, MemberExpression, ArrayExpression, Declarator, Node, Block, Conditional, OutlineOperation } from "../ast";
import { hasNodesOfType, SemanticError, isTypeName } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import { getLast } from "../pathFunctions";
import toCodeString from "../toCodeString";

function toIsCheck(node: Expression) {
    let { location } = node
    return new BinaryExpression({
        location,
        left: new DotExpression({ location }),
        operator: "is",
        right: node
    })
}

function hasDot(node: Expression) {
    return hasNodesOfType(node, DotExpression.is)
}

function getFinalExpressionStatements(node: Node, expressions: Set<ExpressionStatement> = new Set()) {
    if (Block.is(node)) {
        // check that this is the only expression statement
        for (let i = 0; i < node.body.length - 1; i++) {
            let statement = node.body[i]
            if (ExpressionStatement.is(statement)) {
                throw SemanticError("Only the final statement can be an expression", statement)
            }
        }
        getFinalExpressionStatements(node.body[node.body.length - 1], expressions)
    }
    else if (Conditional.is(node)) {
        getFinalExpressionStatements(node.consequent, expressions)
        if (node.alternate) {
            getFinalExpressionStatements(node.alternate, expressions)
        }
    }
    else if (ExpressionStatement.is(node)) {
        expressions.add(node)
    }
    else {
        throw SemanticError(`Final statement must be an expression`, node)
    }
    return expressions
}

function replaceOutlineOperations(e: Expression) {
    return traverse(e, {
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

function checkTypeExpression(typeExpression: TypeExpression, errors: Array<Error>, root = false) {
    let { value } = typeExpression
    if (root) {
        value = replaceOutlineOperations(value)
    }
    let options = [...splitExpressions(value, "|")]
    options = traverse(options, {
        enter(option, ancestors) { if (ancestors.length == 1) { return skip } },
        leave(option) {
            if (Expression.is(option)) {
                let clauses = [...splitExpressions(option, "&")]
                let before = clauses
                clauses = traverse(clauses, {
                    enter(node, ancestors) { if (ancestors.length == 1) { return skip } },
                    leave(node) {
                        // check that this is a valid terminal expression.
                        //  Array -> clauses for each index
                        if (ArrayExpression.is(node)) {
                            let errorsBefore = errors.length
                            for (let element of node.body) {
                                if (!Expression.is(element)) {
                                    errors.push(SemanticError(`not allowed in type expressions `, element))
                                }
                            }
                            let hasErrors = errors.length > errorsBefore
                            if (!hasErrors) {
                                return replace(
                                    ...node.body.map((element, index) => {
                                        if (Expression.is(element)) {
                                            let { location } = element
                                            return new BinaryExpression({
                                                location,
                                                left: new MemberExpression({
                                                    location: element.location,
                                                    object: new DotExpression({ location }),
                                                    property: new Literal({ location, value: index })
                                                }),
                                                operator: "is",
                                                right: checkTypeExpression(
                                                    new TypeExpression({ location, value: element }),
                                                    errors
                                                )
                                            })
                                        }
                                    })
                                )
                            }
                        }
                        if (ObjectExpression.is(node)) {
                            let errorsBefore = errors.length
                            for (let property of node.body) {
                                if (Property.is(property)) {
                                    //  key can ONLY be Identifier | Reference
                                    //  value can only by Type Reference or Literal or more.
                                    // these can ONLY have a named thingy.
                                    if (!Identifier.is(property.key)) {
                                        errors.push(SemanticError(`Only identifiers or computed type references are allowed as type expression member keys `, property.key))
                                    }
                                }
                                else {
                                    errors.push(SemanticError(`Spread Element not allowed in type expressions `, property))
                                }
                            }
                            let hasErrors = errors.length > errorsBefore
                            if (!hasErrors) {
                                return replace(
                                    ...node.body.map(property => {
                                        if (Property.is(property)) {
                                            let { location } = property
                                            return new BinaryExpression({
                                                location,
                                                left: new MemberExpression({
                                                    location: property.key.location,
                                                    object: new DotExpression({ location }),
                                                    property: property.key
                                                }),
                                                operator: "is",
                                                right: checkTypeExpression(
                                                    new TypeExpression({ location, value: property.value as Expression }),
                                                    errors
                                                )
                                            })
                                        }
                                    })
                                )
                            }
                        }
                        if (BinaryExpression.is(node)) {
                            if (!hasDot(node.left)) {
                                errors.push(SemanticError(`left hand side of binary expressions within type expressions must contain a dot expression`, node.left))
                            }
                            if (node.operator == "|" || node.operator == "&") {
                                errors.push(SemanticError(`do not use logical groups within type expressions`, node))
                            }
                            if (toCodeString(node.left) === toCodeString(node.right)) {
                                if (node.operator == "==") {
                                    errors.push(SemanticError(`clause is always true`, node))
                                }
                                if (node.operator == "!=") {
                                    errors.push(SemanticError(`clause is always false`, node))
                                }
                            }
                        }
                        if (Literal.is(node)) {
                            return toIsCheck(node)
                        }
                        if (Reference.is(node)) {
                            if (isTypeName(node.name)) {
                                return toIsCheck(node)
                            }
                            else {
                                errors.push(SemanticError(`variable references not allowed as implicit type expression, use literals, Type references or (. == ${node.name})`, node))
                            }
                        }
                        if (Call.is(node)) {
                            if (!hasDot(node)) {
                                errors.push(SemanticError(`Call expression within type expression must contain dot expression`, node))
                            }
                        }
                    }
                })
                // make sure that each clause is compatible with each other clause
                if (root) {
                    for (let i = 0; i < clauses.length; i++) {
                        let a = clauses[i]
                        for (let k = i + 1; k < clauses.length; k++) {
                            let b = clauses[k]
                            // check that clause a and b are compatible.
                            let resultab = isConsequent(a, b)
                            // should only have to check one direction.
                            if (resultab === false) {
                                errors.push(SemanticError(`Clauses are incompatible`, a, b))
                                break
                            }
                            if (resultab === true) {
                                errors.push(SemanticError(`Second clause is redundant`, a, b))
                                break
                            }
                            let resultba = isConsequent(b, a)
                            // should only have to check one direction.
                            if (resultba === false) {
                                errors.push(SemanticError(`Clause are incompatible (this shouldn't be possible)`, a, b))
                                break
                            }
                            if (resultba === true) {
                                errors.push(SemanticError(`First clause is redundant`, a, b))
                                break
                            }
                        }
                    }
                }
                return combineExpressions(clauses, "&")
            }
        }
    })
    value = combineExpressions(options, "|")
    //  if the only value is a reference, then we just return that
    //  otherwise we return a TypeExpression
    if (BinaryExpression.is(value) && DotExpression.is(value.left) && Reference.is(value.right)) {
        return value.right
    }
    else {
        return typeExpression.patch({ value })
    }
}

export default function semanticChecks(
    module: Module,
    externals: Map<string,Module>,
    options: Options
): Module | Error[] {
    let errors = new Array<Error>()
    // we only create the scope map to check for redeclaration errors
    let scopes = createScopeMaps(
        module,
        (current, source, previous) => {
            // only parameters (FunctionExpression source) are allowed to redeclare variable names
            if (previous != null && !FunctionExpression.is(source)) {
                errors.push(SemanticError(`Cannot redeclare ${current.name}`, current))
            }
        }
    )
    // check that there is only a single final expression statement
    let last = getLast(module.name)
    let index = 0
    module = traverse(module, {
        enter(node, ancestors) {
            if (Position.is(node) || TypeExpression.is(node)) {
                return skip
            }
        },
        leave(node, ancestors) {
            if (TypeExpression.is(node)) {
                node = checkTypeExpression(node, errors, true)
            }
            let isRootStatement = module.body == ancestors[ancestors.length - 1]
            if (isRootStatement) {
                let isExpression = ExpressionStatement.is(node)
                // node might have been patched
                let isFinalStatement = module.body.length == ++index
                let isVariableWithSameNameAsModule = VariableDeclaration.is(node) && Identifier.is(node.id) && node.id.name == module.name
                if (isVariableWithSameNameAsModule && !isFinalStatement) {
                    errors.push(SemanticError(`Variable with same name as module must be final statement`, node))
                }
                if (isExpression && !isFinalStatement) {
                    errors.push(SemanticError(`Only a single final exported expression is allowed in a module`, node))
                }
                if (VariableDeclaration.is(node) && node.value == null) {
                    errors.push(SemanticError(`Module scoped variables are not allowed`, node))
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
                    if (!isExpression && !ClassDeclaration.is(node)) {
                        if (isVariableWithSameNameAsModule) {
                            // automatically insert a final export with same name
                            node = replace(node, new Reference(node.id))
                        }
                        else {
                            errors.push(SemanticError(`Final statement in module must be a class, variable with same name as module or other expression`, node))
                        }
                    }
                    if (ExpressionStatement.is(node)) {
                        let {value} = node
                        if (FunctionExpression.is(value)) {
                            let name = value.id?.name
                            if (name == null || name != last) {
                                errors.push(SemanticError(`A final export function expression must have a name matching the file (${last})`, value.id || value))
                            }
                        }
                    }
                }
            }
            if (VariableDeclaration.is(node)) {
                if (Declarator.is(node.id)) {
                    if (isTypeName(node.id.name)) {
                        // check type
                        if (node.type != null) {
                            errors.push(SemanticError(`Type declarations cannot have a type`, node))
                        }
                        if (node.value == null) {
                            errors.push(SemanticError(`Type declarations must have a value`, node))
                        }
                        else if (TypeExpression.is(node.value)) {
                            return node.patch({
                                value: checkTypeExpression(node.value, errors)
                            })
                        }
                    }
                }
            }
            if (DotExpression.is(node)) {
                errors.push(SemanticError(`Dot expressions are only valid within Type expressions`, node))
            }
            // if (FunctionExpression.is(node)) {
            // }
            return node
        }
    })
    return errors.length ? errors : module
}