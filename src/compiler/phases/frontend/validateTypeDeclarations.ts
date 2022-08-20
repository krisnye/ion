import { Phase } from "../Phase";
import { isType } from "../../ast/Type";
import { traverseWithScope } from "./createScopeMaps";
import { TypeReference } from "../../ast/TypeReference";
import { Class } from "../../ast/Class";
import { SemanticError } from "../../SemanticError";
import { IntersectionType } from "../../ast/IntersectionType";
import { UnionType } from "../../ast/UnionType";
import { isSubtype } from "../../analysis/isSubtype";

// maybe we should simplify indirect constant references first

export function validateTypeDeclarations(moduleName, module, externals): ReturnType<Phase> {
    let errors = new Array<Error>();
    let result = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors) {
                let parent = ancestors[ancestors.length - 1];
                if (node instanceof TypeReference) {
                    let value = c.getValue(node);
                    if (value instanceof Class) {
                        if (node.name !== value.id.name) {
                            // replace reference with reference to original class
                            node = node.patch({ name: value.id.name });
                        }
                    }
                    else if (isType(value)) {
                        // replace this node with the referenced type
                        node = value.patch({ location: node.location });
                    }
                    else {
                        throw new SemanticError(`Expected Type`, node);
                    }
                }
                if (isType(node) && !isType(parent)) {
                    // next split it up into or expressions
                    for (const option of UnionType.split(node)) {
                        const types = [...IntersectionType.split(option)];
                        for (let i = 0; i < types.length && errors.length == 0; i++) {
                            let a = types[i]
                            for (let k = i + 1; k < types.length; k++) {
                                let b = types[k]
                                // check that clause a and b are compatible.
                                let resultab = isSubtype(b, a, c);
                                // should only have to check one direction.
                                if (resultab === false) {
                                    errors.push(new SemanticError(`Types are incompatible`, a, b));
                                    break;
                                }
                                if (resultab === true) {
                                    errors.push(new SemanticError(`Second type is redundant`, a, b));
                                    break;
                                }
                                let resultba = isSubtype(a, b, c);
                                // should only have to check one direction.
                                if (resultba === false) {
                                    errors.push(new SemanticError(`Types are incompatible`, a, b));
                                    break;
                                }
                                if (resultba === true) {
                                    errors.push(new SemanticError(`First type is redundant`, a, b));
                                    break;
                                }
                            }
                        }
                    }
                    // we are not mutating, only traversing so we'll check on enter and skip children.
                }
                return node;
            }
        };
    });
    return [result, errors];
}
