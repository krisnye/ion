import { Analysis, IfStatement, BinaryExpression, BlockStatement, Expression, Reference, VariableDeclaration, ConditionalDeclaration, DotExpression, Id } from "../ast";
import { traverse, skip } from "../Traversal";
import toCodeString from "../toCodeString";
import { getNodesOfType, isLowerCase } from "../common";
// import { conditionalChainToBinaryExpression } from "./createConditionalChains";

export default function createConditionalDeclarations(root: Analysis) {
    return traverse(root, {
        enter(node) {
        },
        leave(node) {
            if (IfStatement.is(node) && node.consequent.statements.length > 0) {
                //  find all unique named references
                //  create a new ConditionalDeclaration for each, replacing named refs with DotExpression
                // find all variable declaration references
                let refs = new Set(getNodesOfType(node.test, Reference.is).map(n => n.name).filter(isLowerCase))
                // now we have to redeclare more strongly typed stuff.
                let newConsequents = new Array<ConditionalDeclaration>()
                let newAlternates = node.alternate != null ? new Array<ConditionalDeclaration>() : null
                for (let name of refs) {
                    newConsequents.push(new ConditionalDeclaration({
                        location: node.test.location,
                        id: new Id({ name })
                    }))
                    if (newAlternates) {
                        newAlternates.push(new ConditionalDeclaration({
                            negate: true,
                            location: node.test.location,
                            id: new Id({ name })
                        }))
                    }
                }
                let consequent = new BlockStatement({ statements: [...newConsequents, ...node.consequent.statements] })
                let alternate = node.alternate
                if (IfStatement.is(alternate)) {
                    // we must convert ifs to block statements so our scoped variable
                    // won't interfere with it scoping the same named variable.
                    alternate = new BlockStatement({
                        statements: [alternate]
                    })
                }
                if (BlockStatement.is(alternate)) {
                    alternate = alternate.patch({
                        statements: [...newAlternates!, ...alternate.statements]
                    })
                }
                return node.patch({
                    consequent,
                    alternate,
                })
            }
        }
    })
}
