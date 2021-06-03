import { Options } from "../Compiler";
import Analysis from "../ast/Analysis";
import { SemanticError } from "../common";
import ClassDeclaration from "../ast/ClassDeclaration";
import Declaration from "../ast/Declaration";
import Reference from "../ast/Reference";
import Node from "../ast/Node";
import { traverse } from "../Traversal";
import { VariableDeclaration, Id, Literal } from "../ast";
import { getUniqueClientName } from "../pathFunctions";

function mergeDeclarations(base: Declaration, sub: Declaration) {
    // this should actually check that the types can be merged.
    return sub
}

// cannot extend from ion.Object until we provide ability to change reserved names.
// const rootClassReference = new Reference({ name: getAbsoluteName("ion.Object", "Object")})

export default function inheritBaseClasses(root: Analysis, options: Options) {

    let finished = new Map<ClassDeclaration,ClassDeclaration>()
    let inprogress = new Set<ClassDeclaration>()
    function ensureDeclarationsInherited(classDeclaration: ClassDeclaration, source: Node): ClassDeclaration {
        let result = finished.get(classDeclaration)
        if (result == null) {
            if (inprogress.has(classDeclaration)) {
                throw SemanticError(`Circular class extension`, source)
            }
            inprogress.add(classDeclaration)
            let baseDeclarations = new Map<string, Declaration>()
            let baseClasses = new Map<string,Reference>([...classDeclaration.baseClasses].map(r => [r.name, r]))
            function addDeclarations(declarations: Iterable<Declaration>) {
                for (let declaration of declarations) {
                    let current = baseDeclarations.get(declaration.id.name)
                    if (current) {
                        declaration = mergeDeclarations(current, declaration)
                    }
                    baseDeclarations.set(declaration.id.name, declaration)
                }
            }
            for (let baseClass of classDeclaration.baseClasses) {
                let baseDeclaration = root.declarations.get(baseClass.name) as ClassDeclaration
                
                if (!ClassDeclaration.is(baseDeclaration)) {
                    throw SemanticError(`BaseClass is not a class declaration`, baseClass)
                }
                if (classDeclaration.isStructure && !baseDeclaration.isStructure) {
                    throw SemanticError(`Structs cannot inherit from classes`, baseClass)
                }
                baseDeclaration = ensureDeclarationsInherited(baseDeclaration, source)
                for (let ref of baseDeclaration.baseClasses) {
                    baseClasses.set(ref.name, ref)
                }
                addDeclarations(baseDeclaration.declarations.values())
            }
            // now insert the current class declarations
            addDeclarations(classDeclaration.declarations.values())
            // override properties with the same name
            result = classDeclaration.patch({
                baseClasses: Array.from(baseClasses.values()),
                declarations: baseDeclarations
            })
            finished.set(classDeclaration, result)
        }
        return result
    }

    return traverse(root, {
        leave(node) {
            if (ClassDeclaration.is(node)) {
                let declaration = ensureDeclarationsInherited(node, node)
                // TODO: Do we really need to track these implements here?
                // or is there another way later to determine these?
                let names = [getUniqueClientName(node.id.name), ...declaration.baseClasses.map(d => getUniqueClientName(d.name))]
                let typeNameDeclarations = names.map(name => {
                    return new VariableDeclaration({
                        location: node.location,
                        id: new Id({ name }),
                        assignable: false,
                        value: new Literal({ value: true })
                    })
                })
                return declaration.patch({
                    // _implements: names,
                    declarations: new Map([
                        ...declaration.declarations.values(),
                        ...typeNameDeclarations,
                        new VariableDeclaration({
                            location: node.location,
                            id: new Id({ name: "classId" }),
                            assignable: false,
                            value: new Literal({ value: getUniqueClientName(node.id.name) })
                        })
                    ].map(d => [d.id.name, d])),
                })
            }
        }
    })

}