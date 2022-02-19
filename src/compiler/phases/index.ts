import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { semanticChecks } from "./semanticChecks";
import { opsToNodes } from "./opsToNodes";

export const lexical: Phase[] = [
    tokenization,
    parsing,
    semanticChecks,
    opsToNodes,
];
