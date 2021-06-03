import { BlockStatement, IfStatement, Statement } from "../ast";

export default function *getFinalStatements(node: Statement): Iterable<Statement> {
    if (BlockStatement.is(node)) {
        let last = node.body[node.body.length - 1]
        yield* getFinalStatements(last)
    }
    else if (IfStatement.is(node)) {
        yield* getFinalStatements(node.consequent)
        if (node.alternate) {
            yield* getFinalStatements(node.alternate)
        }
    }
    else {
        yield node
    }
}