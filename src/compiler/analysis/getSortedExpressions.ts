import { traverse, skip, Lookup } from "@glas/traverse";
import { ScopeMaps } from "../createScopeMaps";
import toposort from "../toposort";
import { Node, Property, FunctionExpression, Return, Call, BinaryExpression, Expression } from "../ast";
import * as ast from "../ast"
import { SemanticError } from "../common";
import { errorMonitor } from "events";
import { Type } from "../..";

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
                if ((fn.id as any).name == null || !contains(node.value, check => ast.Reference.is(check) && check.name === (fn.id as any).name)) {
                    statements.push(node)
                }
            }
        }
    })
    return statements
}

// export function getContainingIfTestAndOriginalDeclarator(node: ast.ConditionalDeclaration, scopeMap: ScopeMaps, lookup: Lookup): [Expression, ast.Declarator | null] {
//     let containingIf = getAncestor(node, ancestorMap, Conditional.is)!
//     let containingIfScope = scopeMap.get(containingIf)!
//     let name = (node.id as ast.Reference).name
//     let containingVarDeclarator = containingIfScope[name] ?? null
//     return [containingIf.test, containingVarDeclarator]
// }

export function getPredecessors(node, scopeMap: ScopeMaps, lookup: Lookup): Iterable<Expression> {
    return predecessors[node.constructor.name](node, scopeMap, lookup);
}

const predecessors: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, scopeMap: ScopeMaps, lookup: Lookup) => Iterable<Expression | Expression[]>} = {
    // *ConditionalDeclaration(node, scopeMap) {
    //     // the conditional declaration will add it's own local conditional assertion to the variable type
    //     // from the containing scope, so we are dependent on that variable being resolved first.
    //     let [containingIfTest, containingVarDeclarator] = getContainingIfTestAndOriginalDeclarator(node, scopeMap)
    //     if (containingIfTest) {
    //         yield containingIfTest
    //     }
    //     if (containingVarDeclarator) {
    //         yield containingVarDeclarator
    //     }
    // },
    *Conditional(node) {
        yield node.test
        yield node.consequent
        if (node.alternate) {
            yield node.alternate
        }
    },
    *Declarator(node, scopeMap, lookup) {
        yield lookup.findAncestor(node, ast.Expression.is)!
    },
    *ArrayPattern(node, scopeMap, lookup) {
        yield lookup.findAncestor(node, ast.Expression.is)!
        for (let element of node.elements) {
            //  all pattern elements are dependent on this nodes type first.
            //  then their type will be a member of this nodes type
            if (element != null) {
                yield [node, element]
            }
        }
    },
    *ObjectPattern(node, scopeMap, lookup) {
        yield lookup.findAncestor(node, ast.Expression.is)!
        for (let prop of node.properties) {
            //  all object pattern properties are dependent on this nodes type first.
            //  then their type will be a member of this nodes type
            yield [node, prop]
        }
    },
    *BinaryExpression(node) {
        yield [node.left, node.right]
        yield node.left
        yield node.right
    },
    *Block(node) {
        yield node.body[node.body.length - 1]
    },
    *UnaryExpression(node) {
        yield node.argument
    },
    *Literal(node, scopeMap) {
        if (node.type) {
            // we need to know the type for these friggin literals right away.
            yield node.type
        }
    },
    *ObjectExpression(node) {
        for (let property of node.body) {
            if (Property.is(property)) {
                if (Expression.is(property.id)) {
                    yield property.id
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
        yield* node.baseClasses
        yield* node.declarations
        yield* node.typeParameters
    },
    *Variable(node) {
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
        // HMMMM, have to figure out this dependency
        // if (node.returnType === null) {
        //     for (let returnStatement of getNonRecursiveReturnStatements(node)) {
        //         if (returnStatement.value != null) {
        //             yield returnStatement.value
        //         }
        //     }
        // }
    },
    *ReferenceType(node, scopes, lookup) {
        return predecessors.Reference!(node, scopes, lookup)
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
            throw SemanticError(`Referenced value not found '${node.name}'`, node)
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
    *Spread(node) {
        // Spread is an expression type
        yield node.value
    },
    *Call(node) {
        if (node.callee) {
            yield node.callee
        }
        for (let arg of node.arguments) {
            yield arg
        }
    },
}

export default function getSortedExpressions(root, scopeMap: ScopeMaps, lookup: Lookup) {
    let sentinel = {} as Expression;
    let edges: [Expression, Expression][] = [];
    function push(from: Expression, to: Expression) {
        if (ast.Module.is(from)) {
            throw new Error("Module.from")
        }
        if (ast.Module.is(to)) {
            throw new Error("Module.to")
        }
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
        enter(node) {
            // we don't need to type Type nodes or their descendants.
            if (ast.Location.is(node) || ast.Type.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (Expression.is(node)) {
                nodes.push(node)
            }
        }
    });
    // // now... we can try to sort the nodes based on what order we think they should be in.
    // // the reason for this is that we neeed UFCS functions to be defined before they are called.
    // // FunctionExpression depends on parameter types => Classes
    // nodes.sort((a, b) => {
    //     const afunc = FunctionExpression.is(a)
    //     const bfunc = FunctionExpression.is(b)
    //     if (afunc && !bfunc) {
    //         return -1
    //     }
    //     if (bfunc && !afunc) {
    //         return +1
    //     }
    //     return 0
    // })
    for (let node of nodes) {
        let count = 0;
        if (Expression.is(node)) {
            let func = predecessors[node.constructor.name] as (node: Expression, scopeMap: ScopeMaps, lookup: Lookup) => Iterable<Expression | Expression[]>;
            if (func) {
                for (let pred of func(node, scopeMap, lookup)) {
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
