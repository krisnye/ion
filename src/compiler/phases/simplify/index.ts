import { Converter } from "../../converters/Converter";
import { Node } from "../../Node";
import { addTypesToLiterals } from "./addTypesToLiterals";
import { constantPropagation } from "./constantPropagation";
import { evaluateConstants } from "./evaluateConstants";

export const simplifyConverters: Converter<Node>[] = [
    ...addTypesToLiterals,
    ...constantPropagation,
    evaluateConstants
] as any;
