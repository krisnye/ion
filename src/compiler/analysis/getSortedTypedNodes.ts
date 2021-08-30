import { traverse, skip } from "@glas/traverse";
import { ScopeMaps } from "../createScopeMaps";
import toposort from "../toposort";
import { Node, Property, FunctionExpression, Return, Call, BinaryExpression, Expression } from "../ast";
import * as ast from "../ast"
import { SemanticError } from "../common";

function contains(graph, predicate) {
    let found = false
    traverse(graph, {
        enter(node) {
            if (!found && predicate(node)) {
                found = true
            }
            if (found) {
                return skip
            }
        }
    })
    return found
}

function getNonRecursiveReturnStatements(fn: FunctionExpression): Return[] {
    let statements: Return[] = []
    traverse(fn, {
        enter(node) {
            if (Call.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (Return.is(node) && node.value != null) {
                // make sure the return argument doesn't contain a recursive reference to itself.
                if ((fn.id as any)?.path == null || !contains(node.value, check => ast.Reference.is(check) && check.path === (fn.id as any)!.path)) {
                    statements.push(node)
                }
            }
        }
    })
    return statements
}

// export function getContainingIfTestAndOriginalDeclarator(node: ast.ConditionalDeclaration, scopeMap: ScopeMaps, ancestorMap: Map<Node, Node>): [Expression, ast.Declarator | null] {
//     let containingIf = getAncestor(node, ancestorMap, Conditional.is)!
//     let containingIfScope = scopeMap.get(containingIf)!
//     let name = (node.id as ast.Reference).name
//     let containingVarDeclarator = containingIfScope[name] ?? null
//     return [containingIf.test, containingVarDeclarator]
// }

export function getPredecessors(node, scopeMap: ScopeMaps, ancestorMap: Map<Node, Node>): Iterable<Expression> {
    return predecessors[node.constructor.name](node, scopeMap, ancestorMap);
}

const predecessors: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, scopeMap: ScopeMaps, ancestorMap: Map<Node, Node>) => Iterable<Expression | Expression[]>} = {
    // *ConditionalDeclaration(node, scopeMap, ancestorMap) {
    //     // the conditional declaration will add it's own local conditional assertion to the variable type
    //     // from the containing scope, so we are dependent on that variable being resolved first.
    //     let [containingIfTest, containingVarDeclarator] = getContainingIfTestAndOriginalDeclarator(node, scopeMap, ancestorMap)
    //     if (containingIfTest) {
    //         yield containingIfTest
    //     }
    //     if (containingVarDeclarator) {
    //         yield containingVarDeclarator
    //     }
    // },
    *ArrayPattern(node) {
        for (let element of node.elements) {
            //  all pattern elements are dependent on this nodes type first.
            //  then their type will be a member of this nodes type
            if (element != null) {
                yield [node, element]
            }
        }
    },
    *ObjectPattern(node) {
        for (let prop of node.properties) {
            //  all object pattern properties are dependent on this nodes type first.
            //  then their type will be a member of this nodes type
            yield [node, prop]
        }
    },
    *BinaryExpression(node) {
        yield node.left
        yield node.right
    },
    *UnaryExpression(node) {
        yield node.argument
    },
    *Declarator(node, scopeMap, ancestorMap) {
        let parent = ancestorMap.get(node)
        if (Expression.is(parent)) {
            yield parent
        }
    },
    *Literal(node, scopeMap, ancestorMap) {
        if (node.type) {
            // we need to know the type for these friggin literals right away.
            yield node.type
        }
    },
    *ObjectExpression(node) {
        for (let property of node.body) {
            if (Property.is(property)) {
                if (Expression.is(property.key)) {
                    yield property.key
                }
                if (Expression.is(property.value)) {
                    yield property.value
                }
            }
            else if (ast.Spread.is(property)){
                // SpreadElement
                yield property.value
            }
            else {
                throw new Error("Unrecognized Element: " + property.constructor.name);
            }
        }
    },
    *ClassDeclaration(node) {
        // this nodes declarator is dependent on this node
        yield [node, node.id]
        yield* node.baseClasses
        yield* node.declarations
        yield* node.typeParameters
    },
    *Variable(node) {
        // make the id pattern dependent on this type
        yield [node, node.id]
        if (node.value) {
            yield node.value
        }
        if (node.type) {
            yield node.type
        }
    },
    *TypeExpression(node) {
        yield node.value
    },
    *FunctionExpression(node) {
        // a function depends on it's parameters which means it depends on it's parameter types
        yield* node.parameters
        if (node.returnType === null) {
            for (let returnStatement of getNonRecursiveReturnStatements(node)) {
                if (returnStatement.value != null) {
                    yield returnStatement.value
                }
            }
        }
    },
    *Reference(node, scopes) {
        if (node.arguments) {
            yield* node.arguments
        }
        let referencedNode = scopes.get(node)[node.name]
        if (referencedNode != null) {
            yield referencedNode
            // we don't throw on unrealized references... we just will consider them type any
        }
        else {
            throw SemanticError("Referenced value not found", node)
        }
    },
    *MemberExpression(node) {
        yield node.object
        if (Expression.is(node.property)) {
            yield node.property
        }
    },
    *ArrayExpression(node) {
        for (let element of node.body) {
            if (ast.Spread.is(element)) {
                yield element.value
            }
            else if (element != null) {
                yield element
            }
        }
    },
    *Call(node, scopeMap, ancestorMap) {
        if (node.callee) {
            yield node.callee
        }
        for (let arg of node.arguments) {
            if (ast.Spread.is(arg)) {
                yield arg.value
            }
            else {
                yield arg
            }
        }
    },
}

export default function getSortedExpressionNodes(root, scopeMap: ScopeMaps, ancestorsMap: Map<Node, Node>) {
    let sentinel = {} as Expression;
    let edges: [Expression, Expression][] = [];
    function push(from: Expression, to: Expression) {
        if (from == null || to == null) {
            throw new Error("Edge nodes may not be null")
        }
        if (from === to) {
            console.error(from)
            throw new Error("Attempt to add same node as dependency of itself")
        }
        edges.push([from, to])
    }
    let nodes = new Array<Expression>()
    traverse(root, {
        leave(node) {
            if (Expression.is(node)) {
                nodes.push(node)
            }
        }
    });
    // now... we can try to sort the nodes based on what order we think they should be in.
    // the reason for this is that we neeed UFCS functions to be defined before they are called.
    // FunctionExpression depends on parameter types => Classes
    nodes.sort((a, b) => {
        const afunc = FunctionExpression.is(a)
        const bfunc = FunctionExpression.is(b)
        if (afunc && !bfunc) {
            return -1
        }
        if (bfunc && !afunc) {
            return +1
        }
        return 0
    })
    for (let node of nodes) {
        if (BinaryExpression.is(node)) {
            push(node.left, node.right)
        }
        let count = 0;
        if (Expression.is(node)) {
            let func = predecessors[node.constructor.name] as (node: Expression, scopeMap: ScopeMaps, ancestorsMap: Map<Node, Node>) => Iterable<Expression | Expression[]>;
            if (func) {
                for (let pred of func(node, scopeMap, ancestorsMap)) {
                    count++;
                    if (Array.isArray(pred)) {
                        push(pred[0], pred[1])
                    }
                    else {
                        push(pred, node);
                    }
                }
            }
            if (count === 0) {
                push(sentinel, node);
            }
        }
    }
    let sorted = toposort(edges);
    //  remove sentinel
    sorted.splice(sorted.indexOf(sentinel), 1)
    return sorted;
}
