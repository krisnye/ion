import { Analysis, Conditional, Block, Reference, ConditionalDeclaration, Declarator } from "../ast";
import { traverse, skip } from "@glas/traverse";
import { combineStatements, getNodesOfType, isValueName } from "../common";

export default function createConditionalDeclarations(root: Analysis) {
    return traverse(root, {
        enter(node) {
        },
        leave(node) {
            if (Conditional.is(node)) {
                //  find all unique named references
                //  create a new ConditionalDeclaration for each, replacing named refs with DotExpression
                // find all variable declaration references
                let refs = new Set(getNodesOfType(node.test, Reference.is).map(n => n.name).filter(isValueName))
                // now we have to redeclare more strongly typed stuff.
                let newConsequents = new Array<ConditionalDeclaration>()
                let newAlternates = node.alternate != null ? new Array<ConditionalDeclaration>() : null
                for (let name of refs) {
                    newConsequents.push(new ConditionalDeclaration({
                        location: node.test.location,
                        id: new Declarator({ name })
                    }))
                    if (newAlternates) {
                        newAlternates.push(new ConditionalDeclaration({
                            negate: true,
                            location: node.test.location,
                            id: new Declarator({ name })
                        }))
                    }
                }
                let consequent = combineStatements(...newConsequents, node.consequent)
                let alternate = node.alternate
                if (Conditional.is(alternate)) {
                    // we must convert ifs to block statements so our scoped variable
                    // won't interfere with it scoping the same named variable.
                    alternate = new Block({
                        body: [alternate]
                    })
                }
                if (Block.is(alternate)) {
                    alternate = combineStatements(...newAlternates!, alternate)
                }
                return node.patch({
                    consequent,
                    alternate,
                })
            }
        }
    })
}
