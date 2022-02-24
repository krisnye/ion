import { Phase } from "./Phase";
import { tokenization } from "./tokenization";
import { parsing } from "./parsing";
import { syntacticChecks } from "./syntacticChecks";
import { opsToNodes } from "./opsToNodes";

export const lexical: Phase[] = [
    tokenization,
    parsing,
    syntacticChecks,
    opsToNodes,
];
