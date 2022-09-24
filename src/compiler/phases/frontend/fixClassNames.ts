import { Phase } from "../Phase";
import { Container } from "../../ast/Container";
import { traverseWithScope } from "./createScopeMaps";
import { Class } from "../../ast/Class";
import { join, split } from "../../pathFunctions";
import { Variable } from "../../ast/Variable";
import { replace } from "../../traverse";

export function fixClassNames(moduleName, module: Container, externals: Map<string, Container>): ReturnType<Phase> {
    let errors: Error[] = [];
    let renamed = new Set<string>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                if (node instanceof Class) {
                    let name = node.id.name;
                    let path = split(name);
                    if (path[path.length - 2] === path[path.length - 1]) {
                        console.log(name);
                        let newname = join(...path.slice(0, -1));
                        node = node.patch({
                            id: node.id.patch({ name: newname })
                        })
                        renamed.add(newname);
                    }
                }
                if (node instanceof Variable && ancestors[ancestors.length - 2] === module && renamed.has(node.id.name)) {
                    return replace();
                }
                return node;
            }
        }
    });
    return [result, errors];
}
