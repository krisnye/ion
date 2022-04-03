import { IntegerLiteral } from "../../ast/IntegerLiteral";
import { StringLiteral } from "../../ast/StringLiteral";
import { FloatLiteral } from "../../ast/FloatLiteral";
import { Reference } from "../../ast/Reference";
import { coreTypes } from "../../coreTypes";
import { Literal } from "../../ast/Literal";

const predicate = (a: Literal) => a.type == null;

export const addTypesToLiterals = [
    [IntegerLiteral, predicate, (a: IntegerLiteral) => a.patch({ type: new Reference({ location: a.location, name: coreTypes.integer })})],
    [FloatLiteral, predicate, (a: FloatLiteral) => a.patch({ type: new Reference({ location: a.location, name: coreTypes.float })})],
    [StringLiteral, predicate, (a: StringLiteral) => a.patch({ type: new Reference({ location: a.location, name: coreTypes.string })})],
]
