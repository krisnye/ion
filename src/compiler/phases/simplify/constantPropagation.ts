import { NumberLiteral } from "../../ast/NumberLiteral";
import { Reference } from "../../ast/Reference";
import { Converter } from "../../converters/Converter";

export const constantPropagation: Converter<Reference>[] = [
    [Reference, (ref: Reference, getVariable) => {
        if (ref.constant === null) {
            let variable = getVariable(ref);
            let constant = variable.constant;
            if (constant != null) {
                if (constant && variable.value instanceof NumberLiteral) {
                    // just propagate numeric literals completely.
                    return variable.value;
                }
                return ref.patch({ constant });
            }
        }
        return ref;
    }]
]
