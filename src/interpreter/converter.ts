import { Node } from "../compiler/Node";
import { StringLiteral } from "../compiler/ast/StringLiteral";
import { SourceLocation } from "../compiler/SourceLocation";
import { classIds } from "./classIds";
import { Instance, isFloatInstance, isIntegerInstance, isStringInstance } from "./model";
import { FloatLiteral, IntegerLiteral, NumberLiteral } from "../compiler/ast/NumberLiteral";

export function convertAstNodeToInterpreterInstance(node: Node): Instance {
    if (node instanceof NumberLiteral) {
        if (node.integer) {
            return { type: classIds.Integer, value: node.value }
        }
        else {
            return { type: classIds.Float, value: node.value }
        }
    }
    if (node instanceof StringLiteral) {
        return { type: classIds.String, value: node.value }
    }
    throw new Error(`Not implemented: ${ node.constructor.name }`);
}

export function convertInterpreterInstanceToAstNode(instance: Instance, location: SourceLocation) {
    if (isIntegerInstance(instance)) {
        return IntegerLiteral({ location, value: instance.value });
    }
    if (isFloatInstance(instance)) {
        return FloatLiteral({ location, value: instance.value });
    }
    if (isStringInstance(instance)) {
        return new StringLiteral({ location, value: instance.value });
    }
    throw new Error(`Not implemented: ${instance.type}`);
}