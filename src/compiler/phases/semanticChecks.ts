import { traverse, skip, replace, Lookup } from "@glas/traverse";
import combineExpressions from "../analysis/combineExpressions";
import isConsequent from "../analysis/isConsequent";
import splitExpressions from "../analysis/splitExpressions";
import { Assignment, BinaryExpression, Call, ClassDeclaration, DotExpression, Expression, ExpressionStatement, FunctionExpression, Identifier, Literal, Module, ObjectExpression, Position, Reference, TypeExpression, Variable, Property, MemberExpression, ArrayExpression, Declarator, Node, Block, Conditional, OutlineOperation, Declaration } from "../ast";
import { hasNodesOfType, SemanticError, isTypeName, isMetaName } from "../common";
import { Options } from "../Compiler"
import createScopeMaps from "../createScopeMaps";
import { getLast } from "../pathFunctions";
import { _this } from "../reservedWords";
import toCodeString from "../toCodeString";
import { Class } from "../types";

function toCheck(node: Expression, operator = "is") {
    let { location } = node
    return new BinaryExpression({
        location,
        left: new DotExpression({ location }),
        operator,
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

function checkTypeExpression(typeExpression: TypeExpression, errors: Array<Error>, lookup: Lookup, root = false) {
    let { value } = typeExpression
    if (root) {
        value = replaceOutlineOperations(value, lookup)
    }
    let options = [...splitExpressions(value, "|")]
    options = traverse(options, {
        lookup,
        enter(option, ancestors) { if (ancestors.length == 1) { return skip } },
        leave(option) {
            if (Expression.is(option)) {
                let clauses = [...splitExpressions(option, "&")]
                let before = clauses
                clauses = traverse(clauses, {
                    lookup,
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
                                                    errors,
                                                    lookup
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
                                                    errors,
                                                    lookup,
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
                            return toCheck(node)
                        }
                        if (Reference.is(node)) {
                            return toCheck(node, isTypeName(node.name) ? "is" : "==")
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
    let lookup = new Lookup()
    let scopes = createScopeMaps(
        module, {
            lookup,
            callback(current, ancestors, previous) {
                // only parameters (FunctionExpression source) are allowed to redeclare variable names
                if (previous != null && !FunctionExpression.is(ancestors[ancestors.length - 2])) {
                    // console.log({ current: current.location, source: source.location, previous: previous.location })
                    errors.push(SemanticError(`Cannot redeclare ${current.id.name}`, current))
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
            if (Position.is(node) || TypeExpression.is(node)) {
                return skip
            }
        },
        leave(node, ancestors) {
            if (TypeExpression.is(node)) {
                node = checkTypeExpression(node, errors, lookup, true)
            }
            if (Variable.is(node)) {
                var container = ancestors[ancestors.length - 1]
                var ancestor = ancestors[ancestors.length - 2]
                var parentClass = ClassDeclaration.is(ancestor) ? ancestor : null
                if (parentClass) {
                    node = node.patch(node.type ? { isInstance: true } : { isStatic: true })
                }
                if (FunctionExpression.is(ancestor)) {
                    if (ancestor.parameters === container) {
                        node = node.patch({ isParameter: true })
                    }
                }
                if (isMetaName(node.id.name)) {
                    node = node.patch({ isMeta: true })
                }
                else if (isTypeName(node.id.name)) {
                    node = node.patch({ isType: true })
                    // check type
                    if (node.type != null) {
                        errors.push(SemanticError(`Type declarations cannot have a type`, node))
                    }
                    if (node.value == null) {
                        errors.push(SemanticError(`Type declarations must have a value`, node))
                    }
                    else if (TypeExpression.is(node.value)) {
                        node = node.patch({
                            value: checkTypeExpression(node.value, errors, lookup)
                        })
                    }
                }
            }

            if (DotExpression.is(node)) {
                errors.push(SemanticError(`Dot expressions are only valid within Type expressions`, node))
            }

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
                            if (param.id.name === _this) {
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
            }
            return node
        }
    })
    return errors.length ? errors : module
}