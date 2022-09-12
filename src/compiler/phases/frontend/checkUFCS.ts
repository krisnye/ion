import { Phase } from "../Phase";
import { Container } from "../../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { FunctionDeclaration } from "../../ast/FunctionDeclaration";
import { Call } from "../../ast/Call";
import { isDeclaration } from "../../ast/Declaration";

export function checkUFCS(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors: Error[] = [];
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node) {
                if (node instanceof Call) {
                    let errors: Error[] = [];
                    let funcs = node.getResolvedPossibleFunctions(c, errors) ?? [];
                    let multiFunctionIndices = funcs.filter(isDeclaration).filter(d => d.order != null).map(d => d.order!).sort();
                    if (multiFunctionIndices.length > 0) {
                        node = node.patch({ multiFunctionIndices });
                    }
                    if (node.uniformFunctionCallSyntax != null && errors.length > 0) {
                        throw errors[0];
                    }
                }
                return node;
            }
        }
    });
    return [result, errors];
}
