import { IntegerLiteral } from "../../ast/IntegerLiteral";
import { StringLiteral } from "../../ast/StringLiteral";
import { FloatLiteral } from "../../ast/FloatLiteral";
import { Reference } from "../../ast/Reference";
import { coreTypes } from "../../coreTypes";

export const addTypesToLiterals = [
    [IntegerLiteral, (a: IntegerLiteral) => a.type != null ? a : a.patch({ type: new Reference({ location: a.location, name: coreTypes.Integer, constant: true }), constant: true })],
    [FloatLiteral, (a: FloatLiteral) => a.type != null ? a : a.patch({ type: new Reference({ location: a.location, name: coreTypes.Float, constant: true }), constant: true })],
    [StringLiteral, (a: StringLiteral) => a.type != null ? a : a.patch({ type: new Reference({ location: a.location, name: coreTypes.String, constant: true }), constant: true })],
]
