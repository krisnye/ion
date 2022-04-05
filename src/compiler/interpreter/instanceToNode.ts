import { FloatLiteral } from "../ast/FloatLiteral";
import { IntegerLiteral } from "../ast/IntegerLiteral";
import { StringLiteral } from "../ast/StringLiteral";
import { coreTypes } from "../coreTypes";
import { Node } from "../Node";
import { SourceLocation } from "../SourceLocation";

export function instanceToNode(instance, location: SourceLocation): Node {
    let type = instance[""];
    if (type === coreTypes.Integer) {
        return new IntegerLiteral({ location, value: instance.value });
    }
    if (type === coreTypes.Float) {
        return new FloatLiteral({ location, value: instance.value });
    }
    if (type === coreTypes.String) {
        return new StringLiteral({ location, value: instance.value });
    }
    throw new Error("Not Implemented: " + JSON.stringify(instance));
}