import { Phase } from "../Phase";
import { Container } from "../../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { FunctionDeclaration } from "../../ast/FunctionDeclaration";
import { Call } from "../../ast/Call";

export function checkUFCS(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors: Error[] = [];
    let multiFunctions = new Map<string,Array<FunctionDeclaration>>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            enter(node) {
                if (node instanceof Call && node.uniformFunctionCallSyntax != null) {
                    let errors: Error[] = [];
                    let funcs = node.getResolvedPossibleFunctions(c, errors) ?? [];
                    if (errors.length > 0) {
                        throw errors[0];
                    }
                }
            },
            leave(node) {
                // let's also reorder function parameters and provide default values at call site.
                return node;
            }
        }
    });
    return [result, errors];
}
