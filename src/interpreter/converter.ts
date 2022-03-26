import { Node } from "../compiler/Node";
import { FloatLiteral } from "../compiler/ast/FloatLiteral";
import { IntegerLiteral } from "../compiler/ast/IntegerLiteral";
import { StringLiteral } from "../compiler/ast/StringLiteral";
import { SourceLocation } from "../compiler/SourceLocation";
import { classIds } from "./classIds";
import { Instance, isFloatInstance, isIntegerInstance, isStringInstance } from "./model";

export function convertAstNodeToInterpreterInstance(node: Node): Instance {
    if (node instanceof IntegerLiteral) {
        return { type: classIds.Integer, value: node.value }
    }
    if (node instanceof FloatLiteral) {
        return { type: classIds.Float, value: node.value }
    }
    if (node instanceof StringLiteral) {
        return { type: classIds.String, value: node.value }
    }
    throw new Error(`Not implemented: ${ node.constructor.name }`);
}

export function convertInterpreterInstanceToAstNode(instance: Instance, location: SourceLocation) {
    if (isIntegerInstance(instance)) {
        return new IntegerLiteral({ location, value: instance.value });
    }
    if (isFloatInstance(instance)) {
        return new FloatLiteral({ location, value: instance.value });
    }
    if (isStringInstance(instance)) {
        return new StringLiteral({ location, value: instance.value });
    }
    throw new Error(`Not implemented: ${instance.type}`);
}