import { traverse, skip, Lookup } from "@glas/traverse";
import { ScopeMaps } from "../createScopeMaps";
import toposort from "../toposort";
import { Node, Property, Typed, FunctionExpression, Return, Call, BinaryExpression, Expression } from "../ast";
import * as ast from "../ast"
import { SemanticError } from "../common";
import { Type } from "../..";
import toCodeString from "../toCodeString";
import { getFinalExpressionsOrReturnValues } from "../phases/semanticChecks";

function findFirst(node: Node, predicate: (node) => Boolean) {
    let found
    traverse(node, {
        skip() {
            return found != null
        },
        leave(node) {
            if (predicate(node)) {
                found = node
            }
        }
    })
    return found
}

// export function getContainingIfTestAndOriginalDeclarator(node: ast.ConditionalDeclaration, scopeMap: ScopeMaps, lookup: Lookup): [Expression, ast.Declarator | null] {
//     let containingIf = getAncestor(node, ancestorMap, Conditional.is)!
//     let containingIfScope = scopeMap.get(containingIf)!
//     let name = (node.id as ast.Reference).name
//     let containingVarDeclarator = containingIfScope[name] ?? null
//     return [containingIf.test, containingVarDeclarator]
// }

export function getPredecessors(node, scopeMap: ScopeMaps, lookup: Lookup): Iterable<Typed> {
    return predecessors[node.constructor.name](node, scopeMap, lookup);
}

const predecessors: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, scopeMap: ScopeMaps, lookup: Lookup) => Iterable<Typed | Typed[]>} = {
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
    *Module(node) {        
    },
    *TemplateType(node) {
    },
    *ConditionalDeclaration(node) {
    },
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
        // a class is NOT dependent on it's type parameters
        // yield* node.typeParameters
    },
    *Property(node) {
        // if (Expression.is(node.id)) {
        //     yield node.id
        // }
        if (Expression.is(node.value)) {
            yield node.value
        }
    },
    *Parameter(node, scopeMap, lookup) {
        yield* predecessors.Variable!(node, scopeMap, lookup)
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

        let returnValues = getFinalExpressionsOrReturnValues(node.body)
        let nonRecursiveReturnValues = [...returnValues].filter(value => {
            let recursive = findFirst(value, (ref) => ast.Reference.is(ref) && ref.name === node.id?.name)
            if (recursive && node.returnType == null) {
                // This function *could* be indirectly recursive which would not be detected by this.
                throw SemanticError(`Recursive functions must provide returnType`, node)
            }
            return !recursive
        })
        yield* nonRecursiveReturnValues
    },
    *ReferenceType(node, scopes, lookup) {
        yield* predecessors.Reference!(node as any, scopes, lookup)
    },
    *Reference(node, scopes) {
        if (node.typeArguments) {
            yield* node.typeArguments
        }
        let referencedNode = scopes.get(node)[node.name]
        if (referencedNode != null) {
            yield referencedNode
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
            if (ast.Argument.is(arg)) {
                yield arg.value
            }
            else if (Expression.is(arg)) {
                yield arg
            }
        }
    },
}

export default function getSortedExpressions(root, scopeMap: ScopeMaps, lookup: Lookup) {
    let sentinel = {} as Typed;
    let edges: [Typed, Typed][] = [];
    function push(from: Typed, to: Typed) {
        if (from.resolved || to.resolved) {
            return
        }
        // if (ast.Module.is(from)) {
        //     throw new Error("Module.from")
        // }
        // if (ast.Module.is(to)) {
        //     throw new Error("Module.to")
        // }
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
            if (ast.Location.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (Expression.is(node)) {
                nodes.push(node)
            }
        }
    });


    for (let node of nodes) {
        let count = 0;
        if (Typed.is(node)) {
            let func = predecessors[node.constructor.name] as (node: Typed, scopeMap: ScopeMaps, lookup: Lookup) => Iterable<Typed | Typed[]>;
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
            else {
                console.log("getSortedExpressions function not found: " + node.constructor.name)
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
