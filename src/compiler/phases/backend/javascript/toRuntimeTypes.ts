import { AnyType } from "../../../ast/AnyType";
import { Block } from "../../../ast/Block";
import { Function } from "../../../ast/Function";
import { Identifier } from "../../../ast/Identifier";
import { ObjectExpression } from "../../../ast/ObjectExpression";
import { Reference } from "../../../ast/Reference";
import { Return } from "../../../ast/Return";
import { isType, Type } from "../../../ast/Type";
import { TypeReference } from "../../../ast/TypeReference";
import { Variable } from "../../../ast/Variable";
import { EvaluationContext } from "../../../EvaluationContext";
import { traverseWithScope } from "../../frontend/createScopeMaps";
import { Phase } from "../../Phase";

export function toRuntimeType(type: Type, c: EvaluationContext) {
    const { location } = type;
    return new ObjectExpression({
        location,
        nodes: [
            new Variable({
                location,
                id: new Identifier({ location, name: "is" }),
                value: new Function({
                    location,
                    body: new Block({ location, nodes: [
                        new Return({
                            location,
                            value: type.toDotExpression(c, new Reference({ location, name: "_" })),
                        })
                    ]}),
                    parameters: [new Variable({ location, id: new Identifier({ location, name: "_"}), value: null, type: new AnyType({ location }) })],
                    returnType: null,
                })
            })
        ]
    })
}

export function toRuntimeTypes(moduleName, module, externals): ReturnType<Phase> {
    module = traverseWithScope(externals, module, (c) => {
        return {
            leave(node, ancestors, path) {
                //  for ANY Non TypeReference Type which is NOT the right hand side of an 'is' check
                //  => convert to a runtime Type => { is: predicate }
                if (node instanceof Variable && node.isType() && isType(node.value) && !(node.value instanceof TypeReference)) {
                    // GETTING BROKE ON THE Call getPossibleFunctionCall thingy which shouldn't be doing that at this point.
                    return node.patch({ value: toRuntimeType(node.value, c) });
                }
            }
        }
    })
    return [module, []];
}
