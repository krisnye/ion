import Assembly from "../ast/Assembly";
import { traverse } from "../Traversal";
import { SemanticError } from "../common";
import Reference from "../ast/Reference";
import Analysis from "../ast/Analysis";
import createScopeMaps from "../createScopeMaps";
import IdGenerator from "../IdGenerator";
import ImportDeclaration from "../ast/ImportDeclaration";
import { VariableDeclaration } from "../ast";

export default function(reservedWords: Set<string>) {
    return function renameReservedWords(root: Assembly) {
        let identifiers = new Set<string>()
        let scopes = createScopeMaps(root, { identifiers })
        let idGenerator = new IdGenerator(identifiers)

        let newNames = new Map<string,string>()
        function getNewName(name: string) {
            let newName = newNames.get(name)
            if (newName == null) {
                newNames.set(name, newName = idGenerator.createNewIdName("_" + name))
            }
            return newName
        }

        return traverse(root, {
            leave(node) {
                if (ImportDeclaration.is(node)) {
                    if (reservedWords.has(node.id.name)) {
                        return node.patch({
                            id: node.id.patch({ name: getNewName(node.id.name) })
                        })                        
                    }
                }
                if (Reference.is(node)) {
                    if (reservedWords.has(node.name)) {
                        return node.patch({ name: getNewName(node.name) })
                    }
                }
            }
        })
    }
}
