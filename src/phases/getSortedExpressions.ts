import { traverse } from "../ImmutableTraversal";
import { SemanticError } from "../common";
import toposort from "../toposort";
import { stringify } from "../HtmlLogger";

const { ast } = require("../ion")

function getAncestorConstrainedType(ancestors: any[]) {
    // a dot expression is dependent on it's containing baseType
    for (let i = ancestors.length - 1; i >= 0; i--) {
        let ancestor = ancestors[i]
        if (ast.ConstrainedType.is(ancestor)) {
            return ancestor
        }
    }
    throw new Error("ConstrainedType ancestor not found")
}

const getDependenciesFunctions = {
    VariableDeclaration: function*(node, scopeMap) {
        yield node.type
        yield node.value
        yield node.meta
    },
    Reference: function* (node, scopeMap) {
        yield scopeMap.get(node.name)
    },
    ExternalReference: function* (node, scopeMap) {
        throw SemanticError("Why do we still have external references", node)
        // yield scopeMap.get(node.name)
    },
    CallExpression: function*(node, scopeMap) {
        yield node.callee
        for (let arg of node.arguments) {
            if (ast.KeyValuePair.is(arg)) {
                yield arg.value
            }
            else {
                yield arg
            }
        }
    },
    ClassDeclaration: function* (node, scopeMap) {
        yield* node.baseClasses
    },
    BinaryExpression: function* (node, scopeMap) {
        yield node.left
        yield node.right
    },
    UnaryExpression: function* (node, scopeMap) {
        yield node.argument
    },
    ConditionalExpression: function* (node, scopeMap) {
        yield node.test
        yield node.consequent
        yield node.alternate
    },
    DotExpression: function* (node, scopeMap, ancestors) {
        yield getAncestorConstrainedType(ancestors).baseType
    },
    MemberExpression: function* (node, scopeMap) {
        yield node.object
    },
    FunctionExpression: function* (node, scopeMap) {
        for (let { type, value } of node.parameters) {
            yield type
            yield value
        }
    },
    ArrayExpression: function* (node, scopeMap) {
        yield* node.elements
    },
    TemplateReference: function* (node, scopeMap) {
        yield node.baseType
        yield* node.arguments
    },
    ConstrainedType: function* (node, scopeMap) {
        yield node.baseType
        yield node.constraint
    },
    UnionType: function* (node, scopeMap) {
        yield node.left
        yield node.right
    },
    IntersectionType: function* (node, scopeMap) {
        yield node.left
        yield node.right
    }
}

export function getSortedExpressions(root, scopeMap) {
    let sentinel = {}
    let edges: any[] = []
    traverse(root, {
        leave(node, ancestors) {
            if (ast.Expression.is(node)) {
                let func = getDependenciesFunctions[node.constructor.name]
                if (func) {
                    for (let dep of func(node, scopeMap, ancestors)) {
                        if (dep) {
                            if (dep instanceof ast.KeyValuePair) {
                                console.log(stringify(dep.location))
                            }
                            edges.push([dep, node])
                        }
                    }
                }
                else {
                    edges.push([sentinel, node])
                }
            }
        }
    })

    let sorted = toposort(edges)
    //  remove sentinel
    sorted.shift()
    return sorted
}