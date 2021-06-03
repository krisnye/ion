import { traverse, skip } from "../Traversal";
import { ScopeMaps } from "../createScopeMaps";
import toposort from "../toposort";
import { Typed, FunctionExpression, ReturnStatement, CallExpression, BinaryExpression, Expression } from "../ast";
import * as ast from "../ast";
import { getLast, SemanticError } from "../common";
import toCodeString from "../toCodeString";


function getReturnStatements(node: FunctionExpression): ReturnStatement[] {
    let statements: ReturnStatement[] = []
    traverse(node, {
        enter(node) {
            if (CallExpression.is(node)) {
                return skip
            }
        },
        leave(node) {
            if (ReturnStatement.is(node)) {
                statements.push(node)
            }
        }
    })
    return statements
}

export function getAncestorDeclaration(node, scopeMap: ScopeMaps, ancestorMap: Map<ast.Node, Array<any>>, type: (node) => boolean) {
    let ancestors = ancestorMap.get(node)!
    let containingIf = getLast(ancestors, ast.IfStatement.is)!
    let containingIfScope = scopeMap.get(containingIf)
    let containingVarDeclaration = containingIfScope[node.id.name]
    return containingVarDeclaration
}

export function getPredecessors(node, scopeMap: ScopeMaps, ancestorMap: Map<ast.Node, Array<any>>): Iterable<Typed> {
    return predecessors[node.constructor.name](node, scopeMap, ancestorMap);
}

// that is some typescript kung fu right there.
const predecessors: { [P in keyof typeof ast]?: (e: InstanceType<typeof ast[P]>, scopeMap: ScopeMaps, ancestorMap: Map<ast.Node, Array<any>>) => Iterator<Typed>} = {
    *ConditionalDeclaration(node, scopeMap, ancestorMap) {
        // the conditional declaration will add it's own local conditional assertion to the variable type
        // from the containing scope, so we are dependent on that variable being resolved first.
        yield getAncestorDeclaration(node, scopeMap, ancestorMap, ast.IfStatement.is)
    },
    *BinaryExpression(node) {
        yield node.left
        yield node.right
    },
    *UnaryExpression(node) {
        yield node.argument
    },
    *Literal(node, scopeMap, ancestorMap) {
        if (node.type) {
            // we need to know the type for these friggin literals right away.
            yield node.type
        }
    },
    *ObjectExpression(node) {
        for (let property of node.properties) {
            if (Typed.is(property.key)) {
                yield property.key
            }
            yield property.value
        }
    },
    *ClassDeclaration(node) {
        yield* node.baseClasses
        yield* node.declarations.values()
    },
    *Parameter(node) {
        if (node.type) {
            yield node.type
        }
        else {
            if (node.value) {
                yield node.value
            }
        }
    },
    *VariableDeclaration(node) {
        if (node.type == null) {
            if (node.value) {
                yield node.value
            }
        }
        else {
            yield node.type
        }
    },
    *TypeDeclaration(node) {
    },
    *FunctionExpression(node) {
        // a function depends on it's parameters which means it depends on it's parameter types
        yield* node.parameters
        if (node.returnType === null) {
            for (let returnStatement of getReturnStatements(node)) {
                yield returnStatement.value   
            }
        }
    },
    *Reference(node, scopes) {
        let referencedNode = scopes.get(node)[node.name]
        if (referencedNode == null) {
            throw SemanticError("Referenced value not found", node)
        }
        yield referencedNode
    },
    *TemplateReference(node) {
        yield node.reference
        yield* node.arguments
    },
    *MemberExpression(node) {
        yield node.object
        if (Expression.is(node.property)) {
            yield node.property
        }
    },
    *ArrayExpression(node) {
        yield* node.elements
    },
    *CallExpression(node) {
        yield node.callee
        for (let arg of node.arguments) {
            yield arg.value
        }
    },
}

export default function getSortedTypedNodes(root, scopeMap: ScopeMaps, ancestorsMap: Map<ast.Node, Array<any>>) {
    let sentinel = {};
    let edges: any[] = [];
    function push(from, to) {
        if (from == null || to == null) {
            throw new Error("Edge nodes not be null")
        }
        if (from === to) {
            console.error(from)
            throw new Error("Attempt to add same node as dependency of itself")
        }
        edges.push([from, to])
    }
    let nodes = new Array<ast.Typed>()
    traverse(root, {
        leave(node) {
            if (Typed.is(node)) {
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
        let func = predecessors[node.constructor.name];
        let count = 0;
        if (func) {
            for (let pred of func(node, scopeMap, ancestorsMap)) {
                count++;
                push(pred, node);
            }
        }
        if (count === 0) {
            push(sentinel, node);
        }
    }
    let sorted = toposort(edges);
    //  remove sentinel
    sorted.shift();
    return sorted;
}
